import { ENVIRONMENT_INITIALIZER, inject, makeEnvironmentProviders, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter, first } from 'rxjs/operators';
import { SeoService, SeoRouteData } from './seo.service';

function readDeepestData(router: Router): Partial<SeoRouteData> {
  let r = router.routerState.root;
  while (r.firstChild) r = r.firstChild;
  return (r.snapshot?.data ?? {}) as Partial<SeoRouteData>;
}

function initRouteSeoListener() {
  const router = inject(Router);
  const seo    = inject(SeoService);
  const pid    = inject(PLATFORM_ID);

  const events$ = router.events.pipe(filter(e => e instanceof NavigationEnd));

  if (isPlatformServer(pid)) {
    events$.pipe(first()).subscribe(() => {
      const data = readDeepestData(router);
      if (data?.title && data?.description) seo.apply(data as SeoRouteData);
    });
  } else {
    events$.subscribe(() => {
      const data = readDeepestData(router);
      if (data?.title && data?.description) seo.apply(data as SeoRouteData);
    });
  }
}

export function provideRouteSeoListener() {
  return makeEnvironmentProviders([
    { provide: ENVIRONMENT_INITIALIZER, multi: true, useValue: () => initRouteSeoListener() }
  ]);
}
