// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
    // 加载提示语
    loadingText: "正在加载,请稍候...",
    // 接口地址
    server: "http://localhost:3018",
    // 接口超时时间
    timeout: 60 * 1000,
    // sidebar  or   topnav
    layout: "sidebar",
    
    pageSize: 10
};
