import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Animated,
} from 'react-native';

const defaultAnimationDuration = 200;

/**
 * `RkTabBarIndicator` is a component that indicates `RkTabBar` current selection.
 *
 * @extends React.Component
 *
 * @property {string} rkType - `RkTabBarIndicator` type.
 * Should be one of: `` or `rounded`.
 * @property {number} componentWidth - width of `RkTabBar`.
 */
export class RkTabBarIndicator extends React.Component {
  static propTypes = {
    itemCount: PropTypes.number.isRequired,
    componentWidth: PropTypes.number.isRequired,

    style: PropTypes.shape({
      container: View.propTypes.style,
      content: View.propTypes.style,
    }),
  };
  static defaultProps = {
    style: {
      container: {},
      content: {},
    },
  };

  contentOffset = new Animated.Value(0);

  /**
   * scrolls indicator to passed index
   *
   * @param params - object: { index: number, animated: boolean }
   */
  scrollToIndex(params) {
    this.scrollToOffset({
      offset: (this.props.componentWidth / this.props.itemCount) * params.index,
      ...params,
    });
  }

  /**
   * scrolls indicator by passed offset
   *
   * @param params - object: { offset: number, animated: boolean }
   */
  scrollByOffset(params) {
    this.scrollToOffset({
      offset: this.contentOffset + params.offset,
      ...params,
    });
  }

  /**
   * scrolls indicator to passed offset
   *
   * @param params - object: { offset: number, animated: boolean }
   */
  scrollToOffset(params) {
    this.getContentOffsetAnimation(params).start();
  }

  /**
   * @param params - object: {
   *    offset: {
   *      x: number,
   *      y: number,
   *    },
   *    animated: boolean
   *    }
   */
  getContentOffsetAnimation = (params) => {
    const isAnimated = params.animated === undefined ? true : params.animated;
    const animationDuration = isAnimated ? defaultAnimationDuration : 0;
    return Animated.timing(this.contentOffset, {
      toValue: params.offset,
      duration: animationDuration,
    });
  };

  render() {
    const transform = {
      transform: [{ translateX: this.contentOffset }],
    };
    return (
      <View style={this.props.style.container}>
        <Animated.View style={[
          this.props.style.content,
          { width: this.props.componentWidth / this.props.itemCount },
          transform,
        ]}
        />
      </View>
    );
  }
}
