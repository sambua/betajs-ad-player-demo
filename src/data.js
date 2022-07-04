module.exports = {
  exampleTypeOptions: [
    { id: 'localExampleRadio', label: 'Local Examples', value: 'localExamples' },
    { id: 'dcExampleRadio', label: 'DoubleClick Examples', value: 'doubleClickExamples' },
    { id: 'customExampleRadio', label: 'Custom XML File Examples', value: 'customExample' },
  ],
  localExamples: [
    {value: null, label: "Please Select Local Example"},
    {value: 'v3_linear_skip_able', label: "VAST-3 Linear Skippable"},
    {value: 'v4_2_linear_skip_able', label: "VAST-4_2 Linear Skippable"},
    {value: 'v4_2_linear_non_skip-able', label: "VAST-4_2 Non Skippable"},
    {value: 'v3_non_linear', label: "VAST-3 Non Linear"},
  ],
  doubleClickExamples : [
    {value: null, label: "Please Select Double Click example"},
    {
      label: "Single Inline Linear",
      value: "https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_ad_samples&sz=640x480&cust_params=sample_ct%3Dlinear&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator="
    },
    {
      label: "Single Skippable Inline",
      value: "https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_preroll_skippable&sz=640x480&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator="
    },
    {
      label: "Single Redirect Linear",
      value: "https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_ad_samples&sz=640x480&cust_params=sample_ct%3Dredirectlinear&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator="
    },
    {
      label: "Single Redirect Error",
      value: "https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_ad_samples&sz=640x480&cust_params=sample_ct%3Dredirecterror&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator="
    },
    {
      label: "Single Redirect Broken (Fallback)",
      value: "https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_ad_samples&sz=640x480&cust_params=sample_ct%3Dredirecterror&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&nofb=1&correlator="
    },
    {
      label: "Single VPAID 2.0 Linear",
      value: "https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_ad_samples&sz=640x480&cust_params=sample_ct%3Dlinearvpaid2js&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator="
    },
    {
      label: "Single VPAID 2.0 Non-Linear",
      value: "https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_ad_samples&sz=640x480&cust_params=sample_ct%3Dnonlinearvpaid2js&ciu_szs=728x90%2C300x250&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator="
    },
    {
      label: "Single Non-linear Inline",
      value: "https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/nonlinear_ad_samples&sz=480x70&cust_params=sample_ct%3Dnonlinear&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator="
    },
    {
      label: "VMAP Session Ad Rule Pre-roll",
      value: "https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/vmap_ad_samples&sz=640x480&cust_params=sar%3Da0f2&ciu_szs=300x250&ad_rule=1&gdfp_req=1&output=vmap&unviewed_position_start=1&env=vp&impl=s&correlator=\n"
    },
    {
      label: "VMAP Pre-roll",
      value: "https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/vmap_ad_samples&sz=640x480&cust_params=sample_ar%3Dpreonly&ciu_szs=300x250%2C728x90&gdfp_req=1&ad_rule=1&output=vmap&unviewed_position_start=1&env=vp&impl=s&correlator="
    },
    {
      label: "VMAP Pre-roll + Bumper",
      value: "https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/vmap_ad_samples&sz=640x480&cust_params=sample_ar%3Dpreonlybumper&ciu_szs=300x250&gdfp_req=1&ad_rule=1&output=vmap&unviewed_position_start=1&env=vp&impl=s&correlator="
    },
    {
      label: "VMAP Post-roll",
      value: "https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/vmap_ad_samples&sz=640x480&cust_params=sample_ar%3Dpostonly&ciu_szs=300x250&gdfp_req=1&ad_rule=1&output=vmap&unviewed_position_start=1&env=vp&impl=s&correlator="
    },
    {
      label: "VMAP Post-roll + Bumper",
      value: "https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/vmap_ad_samples&sz=640x480&cust_params=sample_ar%3Dpostonlybumper&ciu_szs=300x250&gdfp_req=1&ad_rule=1&output=vmap&unviewed_position_start=1&env=vp&impl=s&correlator=\n"
    },
    {
      label: "VMAP Pre-, Mid-, and Post-rolls, Single Ads",
      value: "https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/vmap_ad_samples&sz=640x480&cust_params=sample_ar%3Dpremidpost&ciu_szs=300x250&gdfp_req=1&ad_rule=1&output=vmap&unviewed_position_start=1&env=vp&impl=s&cmsid=496&vid=short_onecue&correlator=\n"
    },
    {
      label: "",
      value: ""
    }
  ],
  localVastExamples: [
    {
      label: "VAST v3 Inline Non Linear",
      url: "/public/VAST_3_0/Inline_Non-Linear_Tag-test.xml"
    },
    {
      label: "VAST v4.2 Skip able Inline",
      url: "VAST_4_2/Inline_Skipable.xml"
    }
  ],
  imaEvents: [
    'ad-impression',
    'ad-loaded',
    'ad-finished',
    'ad-start',
    'ad-firstQuartile',
    'ad-midpoint',
    'ad-thirdQuartile',
    'ad-allAdsCompleted',
    'ad-pause',
    'ad-click',
    'ad-videoClicked',
    'ad-adProgress',
    'ad-durationChange',
    'ad-skipped'
  ]
}
