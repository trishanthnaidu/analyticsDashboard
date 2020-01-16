import React from 'react';
import { Splash } from './components/Splash';
import { Master } from "./components/Master";
import DeviceOrientation, { Orientation } from "react-screen-orientation";

import './assets/stylesheets/animate.css';

const PrismNXT = {
      UI: {
            SPLASH: {},
            APP: {
                  MARKET_PERFORMANCE: {}
            }
      },
};

PrismNXT.UI.Splash = ({ sid }) =>
      <DeviceOrientation>
            <Orientation orientation="landscape" alwaysRender={false}>
                  <Splash sid={sid} />
            </Orientation>
            <Orientation orientation='portrait' alwaysRender={false}>
                  <Splash sid={sid} />
            </Orientation>
      </DeviceOrientation>

PrismNXT.UI.APP.MARKET_PERFORMANCE = () =>
      <Master />


export { PrismNXT }