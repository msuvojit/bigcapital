import React from 'react';
import { Alignment, Navbar, NavbarGroup } from '@blueprintjs/core';

import { DashboardViewsTabs } from 'components';

import withProjects from './withProjects';
import withProjectsActions from './withProjectsActions';

import { compose, transfromViewsToTabs } from 'utils';

/**
 * Projects views tabs.
 * @returns {React.TSX}
 */
function ProjectsViewTabs({
  // #withProjects
  projectsCurrentView,

  // #withProjectsActions
  setProjectsTableState,
}) {
  // Projects views.
  const tabs = transfromViewsToTabs([]);

  // Handle tab change.
  const handleTabsChange = (viewSlug) => {
    setProjectsTableState({ viewSlug: viewSlug || null });
  };

  return (
    <Navbar className={'navbar--dashboard-views'}>
      <NavbarGroup align={Alignment.LEFT}>
        <DashboardViewsTabs
          currentViewSlug={projectsCurrentView}
          resourceName={''}
          tabs={tabs}
          onChange={handleTabsChange}
        />
      </NavbarGroup>
    </Navbar>
  );
}

export default compose(
  withProjects(({ projectsTableState }) => ({
    projectsCurrentView: projectsTableState?.viewSlug,
  })),
  withProjectsActions,
)();
