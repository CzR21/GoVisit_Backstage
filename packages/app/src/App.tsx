import React from 'react';
import { Navigate, Route } from 'react-router';
import { apiDocsPlugin, ApiExplorerPage } from '@backstage/plugin-api-docs';
import {
  CatalogEntityPage,
  CatalogIndexPage,
  catalogPlugin,
} from '@backstage/plugin-catalog';
import {
  CatalogImportPage,
  catalogImportPlugin,
} from '@backstage/plugin-catalog-import';
import { ScaffolderPage, scaffolderPlugin } from '@backstage/plugin-scaffolder';
import { orgPlugin } from '@backstage/plugin-org';
import { SearchPage } from '@backstage/plugin-search';
import { TechRadarPage } from '@backstage/plugin-tech-radar';
import {
  TechDocsIndexPage,
  techdocsPlugin,
  TechDocsReaderPage,
} from '@backstage/plugin-techdocs';
import { TechDocsAddons } from '@backstage/plugin-techdocs-react';
import { ReportIssue } from '@backstage/plugin-techdocs-module-addons-contrib';
import { UserSettingsPage } from '@backstage/plugin-user-settings';
import { apis } from './apis';
import { entityPage } from './components/catalog/EntityPage';
import { searchPage } from './components/search/SearchPage';
import { Root } from './components/Root';

import { AlertDisplay, OAuthRequestDialog } from '@backstage/core-components';
import { createApp } from '@backstage/app-defaults';
import { FlatRoutes } from '@backstage/core-app-api';
import { CatalogGraphPage } from '@backstage/plugin-catalog-graph';
import { PermissionedRoute } from '@backstage/plugin-permission-react';
import { catalogEntityCreatePermission } from '@backstage/plugin-catalog-common/alpha';
import { HomepageCompositionRoot } from '@backstage/plugin-home';
import { HomePage } from './components/home/HomePage';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import LightIcon from '@material-ui/icons/WbSunny';
import {
  createTheme,
  genPageTheme,
  lightTheme,
  darkTheme,
  shapes,
} from '@backstage/theme';
import { githubAuthApiRef, googleAuthApiRef } from '@backstage/core-plugin-api';
import { SignInPage } from '@backstage/core-components';


const app = createApp({
  apis,
  components: {
    SignInPage: props => (
      <SignInPage
        {...props}
        auto
        providers={['guest', {
          id: 'google-auth-provider',
          title: 'Google',
          message: 'Sign in using Google',
          apiRef: googleAuthApiRef,
        }]}
      />
    ),
  },
  themes: [{
    id: 'my-theme',
    title: 'Go Visit Theme',
    variant: 'light',
    icon: <LightIcon />,
    Provider: ({ children }) => (
      <ThemeProvider theme={myTheme}>
        <CssBaseline>{children}</CssBaseline>
      </ThemeProvider>
    ),
  },
  {
    id: 'my-theme-dark',
    title: 'Smart Visit Theme',
    variant: 'dark',
    icon: <LightIcon />,
    Provider: ({ children }) => (
      <ThemeProvider theme={myThemeDark}>
        <CssBaseline>{children}</CssBaseline>
      </ThemeProvider>
    ),
  }],
  bindRoutes({ bind }) {
    bind(catalogPlugin.externalRoutes, {
      createComponent: scaffolderPlugin.routes.root,
      viewTechDoc: techdocsPlugin.routes.docRoot,
    });
    bind(apiDocsPlugin.externalRoutes, {
      registerApi: catalogImportPlugin.routes.importPage,
    });
    bind(scaffolderPlugin.externalRoutes, {
      registerComponent: catalogImportPlugin.routes.importPage,
    });
    bind(orgPlugin.externalRoutes, {
      catalogIndex: catalogPlugin.routes.catalogIndex,
    });
  },
});

const AppProvider = app.getProvider();
const AppRouter = app.getRouter();

const myTheme = createTheme({
  palette: {
    ...lightTheme.palette,
    primary: {
      main: '#2fac66',
    },
    secondary: {
      main: '#2fac66',
    },
    error: {
      main: '#8c4351',
    },
    warning: {
      main: '#8f5e15',
    },
    info: {
      main: '#34548a',
    },
    success: {
      main: '#485e30',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
    banner: {
      info: '#34548a',
      error: '#8c4351',
      text: '#343b58',
      link: '#565a6e',
    },
    errorBackground: '#8c4351',
    warningBackground: '#8f5e15',
    infoBackground: '#2fac66',
    navigation: {
      background: '#05401f',
      indicator: '#2fac66',
      color: '#d5d6db',
      selectedColor: '#ffffff',
    },
  },
  defaultPageTheme: 'home',
  fontFamily: 'Trebuchet MS',
  /* below drives the header colors */
  pageTheme: {
    home: genPageTheme({ colors: ['#2fac66', '#05401f'], shape: shapes.wave }),
    documentation: genPageTheme({
      colors: ['#2fac66', '#05401f'],
      shape: shapes.wave2,
    }),
    tool: genPageTheme({ colors: ['#2fac66', '#05401f'], shape: shapes.round }),
    service: genPageTheme({
      colors: ['#2fac66', '#05401f'],
      shape: shapes.wave,
    }),
    website: genPageTheme({
      colors: ['#2fac66', '#05401f'],
      shape: shapes.wave,
    }),
    library: genPageTheme({
      colors: ['#2fac66', '#05401f'],
      shape: shapes.wave,
    }),
    other: genPageTheme({ colors: ['#2fac66', '#05401f'], shape: shapes.wave }),
    app: genPageTheme({ colors: ['#2fac66', '#05401f'], shape: shapes.wave }),
    apis: genPageTheme({ colors: ['#2fac66', '#05401f'], shape: shapes.wave }),
  },
});

const myThemeDark = createTheme({
  palette: {
    ...darkTheme.palette,
    primary: {
      main: '#017a7a',
    },
    secondary: {
      main: '#017a7a',
    },
    error: {
      main: '#8c4351',
    },
    warning: {
      main: '#8f5e15',
    },
    info: {
      main: '#34548a',
    },
    success: {
      main: '#485e30',
    },
    background: {
      default: '#06201f',
      paper: '#0d4745',
    },
    banner: {
      info: '#34548a',
      error: '#8c4351',
      text: '#343b58',
      link: '#565a6e',
    },
    errorBackground: '#8c4351',
    warningBackground: '#8f5e15',
    infoBackground: '#017a7a',
    navigation: {
      background: '#0d4745',
      indicator: '#017a7a',
      color: '#d5d6db',
      selectedColor: '#ffffff',
    },
  },
  defaultPageTheme: 'home',
  fontFamily: 'Comic Sans MS',
  /* below drives the header colors */
  pageTheme: {
    home: genPageTheme({ colors: ['#017a7a', '#0d4745'], shape: shapes.wave }),
    documentation: genPageTheme({
      colors: ['#017a7a', '#0d4745'],
      shape: shapes.wave2,
    }),
    tool: genPageTheme({ colors: ['#017a7a', '#0d4745'], shape: shapes.round }),
    service: genPageTheme({
      colors: ['#017a7a', '#0d4745'],
      shape: shapes.wave,
    }),
    website: genPageTheme({
      colors: ['#017a7a', '#0d4745'],
      shape: shapes.wave,
    }),
    library: genPageTheme({
      colors: ['#017a7a', '#0d4745'],
      shape: shapes.wave,
    }),
    other: genPageTheme({ colors: ['#017a7a', '#0d4745'], shape: shapes.wave }),
    app: genPageTheme({ colors: ['#017a7a', '#0d4745'], shape: shapes.wave }),
    apis: genPageTheme({ colors: ['#017a7a', '#0d4745'], shape: shapes.wave }),
  },
});

const routes = (
  <FlatRoutes>
    <Route path="/" element={<HomepageCompositionRoot />}>
      <HomePage />
    </Route>
    <Route path="/catalog" element={<CatalogIndexPage />} />
    <Route
      path="/catalog/:namespace/:kind/:name"
      element={<CatalogEntityPage />}
    >
      {entityPage}
    </Route>
    <Route path="/docs" element={<TechDocsIndexPage />} />
    <Route
      path="/docs/:namespace/:kind/:name/*"
      element={<TechDocsReaderPage />}
    >
      <TechDocsAddons>
        <ReportIssue />
      </TechDocsAddons>
    </Route>
    <Route path="/create" element={<ScaffolderPage />} />
    <Route path="/api-docs" element={<ApiExplorerPage />} />
    <Route
      path="/tech-radar"
      element={<TechRadarPage width={1500} height={800} />}
    />
    <PermissionedRoute
      path="/catalog-import"
      permission={catalogEntityCreatePermission}
      element={<CatalogImportPage />}
    />
    <Route path="/search" element={<SearchPage />}>
      {searchPage}
    </Route>
    <Route path="/settings" element={<UserSettingsPage />} />
    <Route path="/catalog-graph" element={<CatalogGraphPage />} />
  </FlatRoutes>
);

const App = () => (
  <AppProvider>
    <AlertDisplay />
    <OAuthRequestDialog />
    <AppRouter>
      <Root>{routes}</Root>
    </AppRouter>
  </AppProvider>
);

export default App;
