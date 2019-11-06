import React from 'react';
import { storiesOf } from '@storybook/react';
import Whitespace from './index';
import PanelHeader from './PanelHeader';
import PanelContainer from './PanelContainer';
import PanelContent from './PanelContent';

storiesOf('Panel', module)
  .addDecorator(story => <div style={{ padding: '3rem' }}>{story()}</div>)
  .add('Whitespace', () => <Whitespace />)
  .add('PanelHeader', () => <PanelHeader title="Form" />)
  .add('PanelContainer', () => (
    <PanelContainer>
      <PanelContent>Panel Sample</PanelContent>
    </PanelContainer>
  ))
  .add('Panel', () => (
    <Whitespace>
      <PanelHeader title="Form" />
      <PanelContainer>
        <PanelContent>Panel Sample</PanelContent>
      </PanelContainer>
    </Whitespace>
  ));
