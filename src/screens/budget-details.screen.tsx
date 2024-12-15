import React, { useEffect, useState } from "react";
import { BarChart } from "react-native-gifted-charts";
import { View, Text, StyleSheet } from "react-native";
import { ruleTypes } from "gifted-charts-core";
import { yAxisSides } from "gifted-charts-core";
import { Pattern, Rect } from "react-native-svg";
import { stackDataItem } from "gifted-charts-core";
import { Image } from "react-native-elements";
import { theme } from "../theme/main.theme";

export const BudgetDetailsScreen = () => {
  const stackData = [
    {
      stacks: [
        {
          value: 60,
          color: theme.colors.error,
          marginBottom: 0,
          onPress: () => console.log("You pressed red"),
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
        },
        {
          value: 40,
          color: theme.colors.success,
          marginBottom: 0,
          onPress: () => console.log("You pressed green"),
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
        },
      ],
    },
  ];

  return (
    <View
    // style={{
    //   borderWidth: 1,
    //   alignContent: "center",
    //   justifyContent: "center",
    //   alignItems: "center",
    //   backgroundColor: "gray",
    //   alignSelf: "center",
    //   width: "100%",
    //   flexDirection: "row",
    // }}
    >
      <BarChart
        stackData={stackData}
        horizontal
        maxValue={100}
        noOfSections={2}
        stepValue={50}
        parentWidth={200}
        barWidth={100}
        trimYAxisAtTop={true}
        spacing={10}
        hideAxesAndRules={true}
        hideOrigin={true}
        isAnimated
        width={100}
        height={100}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textBox: { flex: 1 },
});
