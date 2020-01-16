import React from 'react';
import Renderer from 'react-test-renderer';
import { AppTheme } from "../../styles/Theme";
import { Splash } from "../../components/Splash";
import { createTheme } from '@rootzjs/ui'

const Provider = createTheme(AppTheme)(Splash);

test(
      'Splash Page load with no cached session',
      () => {
            const SplashWithNoSid = <Provider sid="" />
            const Component = Renderer.create(SplashWithNoSid);
            let ComponentTree = Component.toJSON();

            expect(ComponentTree).toMatchSnapshot();
      }
)

test(
      'Splash Page load with cached User Auth',
      () => {
            const SplashWithNoSid = <Provider sid="12345" />
            const Component = Renderer.create(SplashWithNoSid);
            let ComponentTree = Component.toJSON();

            expect(ComponentTree).toMatchSnapshot();
      }
)