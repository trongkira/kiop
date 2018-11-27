import React from 'react';

import { Text } from 'react-native';

import { RkComponent } from '../rkComponent';

export class RkText extends RkComponent {
    static propTypes = {
      rkType: RkComponent.propTypes.rkType,
      ...Text.propTypes,
    };
    static defaultProps = {
      rkType: RkComponent.defaultProps.rkType,
    };
    componentName = 'RkText';
    typeMapping = {
      text: {},
    };
  
    render() {
      const {
        rkType,
        style,
        children,
        ...textProps
      } = this.props;
      const styles = this.defineStyles(rkType);
      return (
        <Text rkType={rkType} style={[styles.text, style]} {...textProps}>{children}</Text>
      );
    }
  }