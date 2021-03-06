import Dashboard from './DashboardReducer';
import Library from './LibraryReducer';
/**
 * UI State. 'global' defines state items that are available across all pages
 * in the client, while 'Pages' contains state that is specific to a given
 * page.
 *
 * To add a new page simply add the page name within 'Pages' followed by its
 * state definition:
 *
 *  Pages: {
 *    NewPageName: {
 *      stateItem: ...
 *    }
 *  }
 *
 * @param {*} state -
 * @param {*} action -
 * @returns {state} state - UI data maintained in state
 */
const uiState = (state = {
  global: {
    navMenuOpen: false,
  },
  Pages: {
    Library: {
      topic: 'All Topics',
      searchTerm: '',
    },
    Dashboard: {
      currentTab: 0,
    },
  },
}, action) => {
  switch (action.type) {
    case 'SET_CURRENT_DASHBOARD_PATH':
    case 'SET_CURRENT_DASHBOARD_TAB': {
      return {
        ...state,
        Pages: {
          ...state.Pages,
          Dashboard: Dashboard(state.Pages.Dashboard, action),
        },
      };
    }
    case 'SET_LIBRARY_TOPIC':
    case 'SET_LIBRARY_SEARCH_TERM': {
      return {
        ...state,
        Pages: {
          ...state.Pages,
          Library: Library(state.Pages.Library, action),
        },
      };
    }
    case 'TOGGLE_NAV_MENU': {
      return {
        ...state,
        global: {
          ...state.global,
          navMenuOpen: !state.global.navMenuOpen,
        },
      };
    }
    default:
      return state;
  }
};

export default uiState;
