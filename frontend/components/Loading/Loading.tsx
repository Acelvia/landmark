import React, { Component } from "react";
import { WebView } from "react-native-webview";
import { View } from "react-native";

export function Loading({ width, height }: any) {
  return (
    <View
      style={{
        margin: 0,
        padding: 0,
        flex: 1,
        width,
        height,
        position: "absolute",
        zIndex: 5,
        bottom: 0,
        left: 0,
        backgroundColor: "rgba(0,0,0,0.1)",
      }}
    >
      <WebView
        containerStyle={{
          margin: 0,
          padding: 0,
          width,
          height,
          backgroundColor: "rgba(0,0,0,0.1)",
        }}
        source={{
          html: `
          <style>
    .frame {
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.1);
      display: flex;
      align-items: center;
      justify-content: center;
    }
  
    .scale-up-center {
      position: absolute;
      z-index: 3;
      position: absolute;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 1px solid white;
      box-shadow: 0px 0px 6px white;
      background-color: black;
  
      -webkit-animation: scale-up-center 0.8s cubic-bezier(0.39, 0.575, 0.565, 1)
        infinite alternate-reverse both;
      animation: scale-up-center 0.8s cubic-bezier(0.39, 0.575, 0.565, 1) infinite
        alternate-reverse both;
    }
  
    @-webkit-keyframes scale-up-center {
      0% {
        -webkit-transform: scale(0.1);
        transform: scale(0.1);
      }
      100% {
        -webkit-transform: scale(1);
        transform: scale(1);
      }
    }
    @keyframes scale-up-center {
      0% {
        -webkit-transform: scale(0.1);
        transform: scale(0.1);
      }
      100% {
        -webkit-transform: scale(1);
        transform: scale(1);
      }
    }
  
    .scale-up-two {
      position: absolute;
      z-index: 2;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: 1px solid white;
      box-shadow: 0px 0px 6px white;
      background-color: black;
  
      -webkit-animation: scale-up-center 1.2s cubic-bezier(0.39, 0.575, 0.565, 1)
        infinite alternate-reverse both;
      animation: scale-up-center 1.2s cubic-bezier(0.39, 0.575, 0.565, 1) infinite
        alternate-reverse both;
    }
  
    @-webkit-keyframes scale-up-two {
      0% {
        -webkit-transform: scale(0.1);
        transform: scale(0.1);
      }
      100% {
        -webkit-transform: scale(1.5);
        transform: scale(1.5);
      }
    }
    @keyframes scale-up-two {
      0% {
        -webkit-transform: scale(0.1);
        transform: scale(0.1);
      }
      100% {
        -webkit-transform: scale(1.5);
        transform: scale(1.5);
      }
    }
  
    .scale-up-three {
      position: absolute;
      z-index: 1;
      width: 90px;
      height: 90px;
      border-radius: 50%;
      border: 1px solid white;
      box-shadow: 0px 0px 6px white;
      background-color: black;
  
      -webkit-animation: scale-up-center 1.6s cubic-bezier(0.39, 0.575, 0.565, 1)
        infinite alternate-reverse both;
      animation: scale-up-center 1.6s cubic-bezier(0.39, 0.575, 0.565, 1) infinite
        alternate-reverse both;
    }
  
    @-webkit-keyframes scale-up-two {
      0% {
        -webkit-transform: scale(1);
        transform: scale(1);
      }
      100% {
        -webkit-transform: scale(2);
        transform: scale(2);
      }
    }
    @keyframes scale-up-two {
      0% {
        -webkit-transform: scale(0.1);
        transform: scale(0.1);
      }
      100% {
        -webkit-transform: scale(2);
        transform: scale(2);
      }
    }
  </style>
  <div class="frame">
    <div class="scale-up-center"></div>
    <div class="scale-up-two"></div>
    <div class="scale-up-three"></div>
  </div>`,
        }}
      />
    </View>
  );
}
