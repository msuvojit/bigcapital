import React from 'react';
import {
  NavbarDivider,
  NavbarGroup,
  Classes,
  Button,
  Popover,
  PopoverInteractionKind,
  Position,
} from '@blueprintjs/core';
import { FormattedMessage as T } from 'react-intl';
import classNames from 'classnames';

import DashboardActionsBar from 'components/Dashboard/DashboardActionsBar';
import Icon from 'components/Icon';
import NumberFormatDropdown from 'components/NumberFormatDropdown';

import withARAgingSummary from './withARAgingSummary';
import withARAgingSummaryActions from './withARAgingSummaryActions';

import { compose } from 'utils';
import { safeInvoke } from '@blueprintjs/core/lib/esm/common/utils';

/**
 * AR Aging summary sheet - Actions bar.
 */
function ARAgingSummaryActionsBar({
  // #withReceivableAging
  receivableAgingFilter,
  ARAgingSummaryLoading,

  // #withReceivableAgingActions
  toggleFilterARAgingSummary,
  refreshARAgingSummary,

  // #ownProps
  numberFormat,
  onNumberFormatSubmit,
}) {
  const handleFilterToggleClick = () => {
    toggleFilterARAgingSummary();
  };
  // Handles re-calculate report button.
  const handleRecalcReport = () => {
    refreshARAgingSummary(true);
  };
  // Handle number format submit.
  const handleNumberFormatSubmit = (numberFormat) => {
    safeInvoke(onNumberFormatSubmit, numberFormat);
  };

  return (
    <DashboardActionsBar>
      <NavbarGroup>
        <Button
          className={classNames(Classes.MINIMAL, 'button--gray-highlight')}
          text={<T id={'recalc_report'} />}
          onClick={handleRecalcReport}
          icon={<Icon icon="refresh-16" iconSize={16} />}
        />
        <NavbarDivider />

        <Button
          className={classNames(Classes.MINIMAL, 'button--table-views')}
          icon={<Icon icon="cog-16" iconSize={16} />}
          text={
            receivableAgingFilter ? (
              <T id="hide_customizer" />
            ) : (
              <T id={'customize_report'} />
            )
          }
          onClick={handleFilterToggleClick}
          active={receivableAgingFilter}
        />
        <NavbarDivider />

        <Popover
          content={
            <NumberFormatDropdown
              numberFormat={numberFormat}
              onSubmit={handleNumberFormatSubmit}
              submitDisabled={ARAgingSummaryLoading}
            />
          }
          minimal={true}
          interactionKind={PopoverInteractionKind.CLICK}
          position={Position.BOTTOM_LEFT}
        >
          <Button
            className={classNames(Classes.MINIMAL, 'button--filter')}
            text={<T id={'format'} />}
            icon={<Icon icon="numbers" width={23} height={16} />}
          />
        </Popover>

        <Button
          className={Classes.MINIMAL}
          text={<T id={'filter'} />}
          icon={<Icon icon="filter-16" iconSize={16} />}
        />        
        <NavbarDivider />

        <Button
          className={Classes.MINIMAL}
          icon={<Icon icon="print-16" iconSize={16} />}
          text={<T id={'print'} />}
        />
        <Button
          className={Classes.MINIMAL}
          icon={<Icon icon="file-export-16" iconSize={16} />}
          text={<T id={'export'} />}
        />
      </NavbarGroup>
    </DashboardActionsBar>
  );
}

export default compose(
  withARAgingSummaryActions,
  withARAgingSummary(({ receivableAgingSummaryLoading }) => ({
    ARAgingSummaryLoading: receivableAgingSummaryLoading,
  })),
)(ARAgingSummaryActionsBar);