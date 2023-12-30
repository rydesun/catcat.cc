import * as params from "@params";

declare let remark_config: {
  host: string;
  site_id?: string;
  url?: string;
  theme?: string;
  locale?: string;
  no_footer?: boolean;
  components: string[];
};

remark_config = {
  host: params.host,
  locale: params.locale,
  no_footer: true,
  components: [], // 改成在相应页面手动打开
};

if (params.site_id) {
  remark_config.site_id = params.site_id;
}
if (params.url_prefix) {
  remark_config.url = params.url_prefix + window.location.pathname;
}
if (params.theme) {
  remark_config.theme = params.theme;
}
