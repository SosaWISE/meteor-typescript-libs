/// Definitions for the google-maps smart package
///
/// https://atmospherejs.com/dburles/google-maps
/// https://github.com/dburles/meteor-google-maps#api

/// <reference path='google.maps.d.ts'/>

declare module GoogleMaps {
  function initialize(): void;
  function ready(mapName: string, callback: (error, result) => void);
  function loaded(): void;
  function loadUtilityLibrary(path: string): void;
  function load(options?: { v: string, key: string, libraries: string});
  function create(options: {name: string, element: HTMLElement, options?: google.maps.MapOptions, type?: google.maps.Map | google.maps.StreetViewPanorama});
  var maps: {
    [name: string]: {instance: google.maps.Map};
  }
}
