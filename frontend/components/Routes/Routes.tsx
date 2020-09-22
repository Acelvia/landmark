import React, { useEffect, useState } from "react";
import { View } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { Route, useHistory } from "react-router-native";
import { PrivateRoute } from "./PrivateRoute";
import CameraPage from "../CameraPage";
import { auth } from "../../helpers/api/auth";

export function Routes(props: any) {
  return (
    <View>
      <Route path="/" component={() => <CameraPage />} />
    </View>
  );
}
