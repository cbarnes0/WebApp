import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BallotSummaryAccordionSection from './BallotSummaryAccordionSection';


class BallotSummaryAccordion extends Component {
  static propTypes = {
    allowMultipleOpen: PropTypes.bool,
    children: PropTypes.instanceOf(Object).isRequired,
  };

  constructor (props) {
    super(props);

    this.state = {
      openSections: {},
    };
  }

  componentDidMount () {
    const openSections = {};

    this.props.children.forEach((child) => {
      if (child && child.props && child.props.isOpen) {
        openSections[child.props.label] = true;
      }
    });

    this.setState({ openSections });
  }

  componentWillReceiveProps (nextProps) {
    // console.log('BallotSummaryAccordion componentWillReceiveProps');
    const openSections = {};

    nextProps.children.forEach((child) => {
      if (child && child.props && child.props.isOpen) {
        openSections[child.props.label] = true;
      }
    });

    this.setState({ openSections });
  }

  onClick = (label) => {
    // console.log('BallotSummaryAccordion onClick');
    const {
      props: { allowMultipleOpen },
      state: { openSections },
    } = this;

    const isOpen = !!openSections[label];

    if (allowMultipleOpen) {
      this.setState({
        openSections: {
          ...openSections,
          [label]: !isOpen,
        },
      });
    } else {
      this.setState({
        openSections: {
          [label]: !isOpen,
        },
      });
    }
  };

  render () {
    // console.log('BallotSummaryAccordion render');
    const {
      onClick,
      props: { children },
      state: { openSections },
    } = this;

    return (
      <>
        {children.map(child => (
          <BallotSummaryAccordionSection
            isOpen={!!openSections[child.props.label]}
            key={`accordionKey-${child.props.label}`}
            label={child.props.label}
            onClick={onClick}
          >
            {child.props.children}
          </BallotSummaryAccordionSection>
        ))}
      </>
    );
  }
}

export default BallotSummaryAccordion;
