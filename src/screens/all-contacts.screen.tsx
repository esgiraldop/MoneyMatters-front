import React, {useCallback, useEffect, useState} from 'react';
import {SectionList, Text, View} from 'react-native';
import {GoToContacDetailsButton} from '../components/allContacts';
import {ContactsService} from '../services/contacts.service';
import {IContact} from '../interfaces/contact.interface';
import {useFocusEffect} from '@react-navigation/native';
import {PermissionEnum} from '../interfaces/permissions.interface';
import {checkPermission} from '../utilities/check-permissions.utility';
import {NotifyUserPermissionModal} from '../components/common/notifyUserPermissionModal.component';
import {
  getContactsToSync,
  postNewContacts,
} from '../utilities/check-contacts-to-sync.utility';
import {ConfirmationModal} from '../components/common/confirmation-modal.component';
import {Contact} from 'react-native-contacts/type';
import {useSyncContext} from '../contexts/contacts-syncronization.context';
import {isNull} from '../utilities/checkIsNull.utility';
import {textStyles} from '../styles/text.styles';
import {containerStyles} from '../styles/container.styles';
import {IconButton} from '../components/common/IconButton';
import Icon from 'react-native-vector-icons/Ionicons';
import {theme} from '../theme/main.theme';
import {SearchBar} from '@rneui/themed';
import {groupBy} from 'lodash';
import {Loader} from '../components';

export function AllContactsScreen(): React.JSX.Element {
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<IContact[]>([]);
  const [isLoading, setIsLoading] = useState<boolean | null>(null);
  const [errorLoading, setErrorLoading] = useState<boolean | null>(null);
  const [permissionModalOpen, setPermissionModalopen] =
    useState<boolean>(false);
  const {
    askUserSyncModalOpen,
    setAskUserSyncModalOpen,
    hasUserResponded,
    setHasUserResponded,
  } = useSyncContext();
  const [contacts2Sync, setcontacts2Sync] = useState<Contact[] | null>(null);
  const [filterByName, setFilterByName] = useState<string>('');

  useEffect(() => {
    const syncContacts = async () => {
      const params: Record<string, string> = {};
      const response = await ContactsService.getAll(params);
      if (response) {
        //If app's contacts could be loaded, ask permission for reading phone's contacts and numbers

        const contactsPermissionResponse = await checkPermission(
          PermissionEnum.READ_CONTACTS,
        );
        const cellphonesPermissionResponse = await checkPermission(
          PermissionEnum.READ_PHONE_NUMBERS,
        );

        if (contactsPermissionResponse && cellphonesPermissionResponse) {
          // If user gave permissions for contacts and numbers, get phone's contacts and sync them
          const phoneContactsResponse = await ContactsService.sync();

          if (phoneContactsResponse) {
            const contactsToSync = getContactsToSync(
              response.data,
              phoneContactsResponse,
            );

            // Call modal for asking user to sync contacts. If the modal was already called this is never executed unless the user closes the app and opens it again
            if (
              contactsToSync.length > 0 &&
              !hasUserResponded &&
              isNull(askUserSyncModalOpen.isModalOpen)
            ) {
              setcontacts2Sync(contactsToSync);
              setAskUserSyncModalOpen({
                isModalOpen: true,
                numNewContacts: contactsToSync.length,
              });
            }
          }
          // If there was an error getting the contacs, a snackbar is shown from the service, and the application continues as normal
        } else {
          setPermissionModalopen(true);
        }
      }
    };
    syncContacts();
    return () => {};
  }, [hasUserResponded, askUserSyncModalOpen]);

  const handleSyncContacts = useCallback(async () => {
    // Close the modal after user hits ok
    setAskUserSyncModalOpen({
      isModalOpen: false,
      numNewContacts: 0,
    });
    setHasUserResponded(true);
    if (contacts2Sync) {
      setIsLoading(true);
      setErrorLoading(null);
      const insertResponse = await postNewContacts(contacts2Sync.slice(0, 10));
      if (
        insertResponse &&
        insertResponse.data.length !== askUserSyncModalOpen.numNewContacts
      ) {
        console.log(
          'The number of contacts inserted in the database and the number contacts to be syncronized are not the same, so probably there was an error',
        );
      }
      const params: Record<string, string> = {};
      const response = await ContactsService.getAll(params);
      if (response) {
        setContacts(response.data);
        setIsLoading(false);
        setErrorLoading(false);
      } else {
        setIsLoading(false);
        setErrorLoading(true);
      }
    }
  }, [contacts, contacts2Sync]);

  useFocusEffect(
    useCallback(() => {
      async function fetchAllContacts() {
        setIsLoading(true);
        const params: Record<string, string> = {}; //Preparing parameters for fetching contacts
        if (filterByName) params.filterByName = filterByName;
        // Contacts saved in the app's database do not need permission for reading contacts/phone numbers from the phone
        const response = await ContactsService.getAll(params);

        if (response) {
          setContacts(response.data);
          setFilteredContacts(response.data);
          setErrorLoading(false);
        } else {
          setErrorLoading(true);
        }
        setIsLoading(false);
      }
      fetchAllContacts();

      return () => {};
    }, [filterByName]),
  );

  const groupedContacts = useCallback(() => {
    const grouped = groupBy(filteredContacts, contact =>
      contact.name.charAt(0).toUpperCase(),
    );

    return Object.entries(grouped)
      .sort(([a], [b]) => a.localeCompare(b)) // Sort alphabetically
      .map(([letter, contactsInfo]) => ({
        title: letter,
        data: contactsInfo,
      }));
  }, [filteredContacts]);

  const handleSearch = (text: string) => {
    setFilterByName(text);
    if (text.trim() === '') {
      setFilteredContacts(contacts);
    } else {
      const filtered = contacts.filter(contact =>
        contact.name.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredContacts(filtered);
    }
  };

  return (
    <>
      <View style={containerStyles.container}>
        <View style={containerStyles.buttonsCarrouselContainer}>
          <IconButton size={40}>
            <Icon
              name="add-outline"
              size={30}
              color={theme.colors.textPrimary}
            />
          </IconButton>
          <View style={{flex: 1, paddingLeft: 10}}>
            <SearchBar
              containerStyle={containerStyles.searchBarContainer}
              inputContainerStyle={containerStyles.searchBarInputContainer}
              placeholder="Search..."
              inputStyle={textStyles.searchBarInput}
              placeholderTextColor={theme.colors.textSecondary}
              onChangeText={handleSearch}
              value={filterByName}
            />
          </View>
        </View>
        {isLoading ? (
          <Loader />
        ) : errorLoading ? (
          <Text style={textStyles.loadingText}>Error loading contacts</Text>
        ) : (
          <>
            <SectionList
              sections={groupedContacts()}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <GoToContacDetailsButton
                  name={item.name}
                  id={item.id}
                  imageUri={item.imageUri}
                />
              )}
              renderSectionHeader={({section: {title}}) => (
                <Text style={textStyles.sectionHeader}>{title}</Text>
              )}
            />
          </>
        )}
        {permissionModalOpen && (
          <NotifyUserPermissionModal
            modalOpen={permissionModalOpen}
            setModalopen={setPermissionModalopen}
            message={
              "Please enable the app permissions from the settings to be able to syncronize the phone's contacts with Close To You app"
            }
          />
        )}
        {askUserSyncModalOpen.isModalOpen && (
          <ConfirmationModal
            confirmationModalVisible={askUserSyncModalOpen}
            setConfirmationModalVisible={setAskUserSyncModalOpen}
            handleAccept={handleSyncContacts}
            requiresCancel={true}
            handleCancel={() => setHasUserResponded(true)}>
            <Text>
              {askUserSyncModalOpen.numNewContacts} new contacts have been
              found. Do you want to syncronize them? (Only 10 contacts will be
              syncronized)
            </Text>
          </ConfirmationModal>
        )}
      </View>
    </>
  );
}
