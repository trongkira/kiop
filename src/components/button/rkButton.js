import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
  ViewPropTypes,
} from 'react-native';
import _ from 'lodash';

import { RkText } from '../text/rkText';
import { RkComponent } from '../rkComponent';

export class RkButton extends RkComponent {
  static propTypes = {
    style: ViewPropTypes.style,
    contentStyle: ViewPropTypes.style,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    touchable: PropTypes.func,
  };
  static defaultProps = {
    style: null,
    contentStyle: null,
    children: [],
    touchable: TouchableOpacity,
  };
  static contextTypes = {
    theme: PropTypes.object,
  };
  componentName = 'RkButton';
  typeMapping = {
    container: {
      hitSlop: 'hitSlop',
    },
    content: {
      color: 'color',
      fontSize: 'fontSize',
    },
  };

  renderChildren(style) {
    const displayText = (text) => (
      <RkText style={[style, this.props.contentStyle]}>{text}</RkText>);
    if (typeof this.props.children === 'string') {
      return displayText(this.props.children);
    }
    const babies = _.isArray(this.props.children) ? this.props.children : [this.props.children];
    return React.Children.map(babies, (baby) => {
      if (typeof baby === 'string') {
        return displayText(baby);
      }
      const { style: babyStyle, ...babyProps } = baby.props;
      return React.cloneElement(baby, {
        style: [this.props.contentStyle, babyStyle],
        ...babyProps,
      });
    });
  }

  render() {
    const { container, content } = super.defineStyles();
    const { style, touchable: Touchable, ...touchableProps } = this.props;
    const hitSlop = this.extractNonStyleValue(container, 'hitSlop');
    if (hitSlop) touchableProps.hitSlop = hitSlop;

    return (
      <Touchable style={[container, style]} {...touchableProps}>
        {this.props.children && this.renderChildren(content)}
      </Touchable>
    );
  }
}