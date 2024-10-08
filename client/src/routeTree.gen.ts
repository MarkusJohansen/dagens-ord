/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'

// Create Virtual Routes

const SokLazyImport = createFileRoute('/sok')()
const OmProsjektetLazyImport = createFileRoute('/om-prosjektet')()
const BidraLazyImport = createFileRoute('/bidra')()
const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const SokLazyRoute = SokLazyImport.update({
  path: '/sok',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/sok.lazy').then((d) => d.Route))

const OmProsjektetLazyRoute = OmProsjektetLazyImport.update({
  path: '/om-prosjektet',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/om-prosjektet.lazy').then((d) => d.Route))

const BidraLazyRoute = BidraLazyImport.update({
  path: '/bidra',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/bidra.lazy').then((d) => d.Route))

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/bidra': {
      id: '/bidra'
      path: '/bidra'
      fullPath: '/bidra'
      preLoaderRoute: typeof BidraLazyImport
      parentRoute: typeof rootRoute
    }
    '/om-prosjektet': {
      id: '/om-prosjektet'
      path: '/om-prosjektet'
      fullPath: '/om-prosjektet'
      preLoaderRoute: typeof OmProsjektetLazyImport
      parentRoute: typeof rootRoute
    }
    '/sok': {
      id: '/sok'
      path: '/sok'
      fullPath: '/sok'
      preLoaderRoute: typeof SokLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/bidra': typeof BidraLazyRoute
  '/om-prosjektet': typeof OmProsjektetLazyRoute
  '/sok': typeof SokLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/bidra': typeof BidraLazyRoute
  '/om-prosjektet': typeof OmProsjektetLazyRoute
  '/sok': typeof SokLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/bidra': typeof BidraLazyRoute
  '/om-prosjektet': typeof OmProsjektetLazyRoute
  '/sok': typeof SokLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/bidra' | '/om-prosjektet' | '/sok'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/bidra' | '/om-prosjektet' | '/sok'
  id: '__root__' | '/' | '/bidra' | '/om-prosjektet' | '/sok'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  BidraLazyRoute: typeof BidraLazyRoute
  OmProsjektetLazyRoute: typeof OmProsjektetLazyRoute
  SokLazyRoute: typeof SokLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  BidraLazyRoute: BidraLazyRoute,
  OmProsjektetLazyRoute: OmProsjektetLazyRoute,
  SokLazyRoute: SokLazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/bidra",
        "/om-prosjektet",
        "/sok"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/bidra": {
      "filePath": "bidra.lazy.tsx"
    },
    "/om-prosjektet": {
      "filePath": "om-prosjektet.lazy.tsx"
    },
    "/sok": {
      "filePath": "sok.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
