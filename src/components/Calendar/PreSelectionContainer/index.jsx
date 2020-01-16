import React from 'react';
import { PreSelectsForMonth } from "./PreSelectsForMonth";
import { PreSelectsForWeeks } from './PreSelectsForWeeks';
import { PreSelectsForDays } from './PreSelectsForDays';

export const PreSelectionContainer =
      props =>
            <div className={props.classes.preSelectsContainerWrapper}>
                  {/** Section for Month Selection */}
                  <PreSelectsForMonth {...props} />

                  {/** Section for Weeks Selection */}
                  <PreSelectsForWeeks {...props} />

                  {/** Section for Days Selection */}
                  <PreSelectsForDays {...props} />
            </div>
