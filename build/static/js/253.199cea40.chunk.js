"use strict";(self.webpackChunkwhether_app=self.webpackChunkwhether_app||[]).push([[253],{7253:function(e,n,t){t.r(n),t.d(n,{default:function(){return Ze}});var r,i,o,a,c,l,u,s,f,p,d,h,m,v,x=t(4165),g=t(5861),y=t(885),b=t(2791),Z=t(9434),w=t(6871),E=t(1933),j=t(3661),z=t(1177),F=t(4569),S=t.n(F),M=function(){var e=(0,g.Z)((0,x.Z)().mark((function e(n){var t,r;return(0,x.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n){e.next=2;break}return e.abrupt("return");case 2:return e.prev=2,e.next=5,S().get("//api.openweathermap.org/geo/1.0/direct?q=".concat(n,"&limit=1&appid=").concat("e92fab503e7882cf036a92fa156ba435"));case 5:return t=e.sent,e.next=8,t.data;case 8:return r=e.sent,e.abrupt("return",r);case 12:e.prev=12,e.t0=e.catch(2),console.log(e.t0);case 15:case"end":return e.stop()}}),e,null,[[2,12]])})));return function(n){return e.apply(this,arguments)}}(),k=function(){var e=(0,g.Z)((0,x.Z)().mark((function e(n){var t,r;return(0,x.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n){e.next=2;break}return e.abrupt("return");case 2:return e.prev=2,e.next=5,S().get("//dataservice.accuweather.com/forecasts/v1/hourly/1hour/".concat(n,"?apikey=").concat("AxuffN8hyQnglBzHoJfhC4eWi7fowmeh"));case 5:return t=e.sent,e.next=8,t.data;case 8:return r=e.sent,e.abrupt("return",r);case 12:e.prev=12,e.t0=e.catch(2),console.log(e.t0);case 15:case"end":return e.stop()}}),e,null,[[2,12]])})));return function(n){return e.apply(this,arguments)}}(),T=t(5678),P=t(1784),C=t(7762),B=t(928),D=t(4056),O=t(6405),Q=t(3825),W=t(223),A=t(5992),I=t(4617),q=["title","titleId"];function L(){return L=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},L.apply(this,arguments)}function R(e,n){if(null==e)return{};var t,r,i=function(e,n){if(null==e)return{};var t,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}function H(e,n){var t=e.title,x=e.titleId,g=R(e,q);return b.createElement("svg",L({width:121,height:120,viewBox:"0 0 121 120",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:n,"aria-labelledby":x},g),t?b.createElement("title",{id:x},t):null,r||(r=b.createElement("path",{d:"M50.492 49.721c-1.031 1.25-2.188 1.563-3.963.966-4.389-1.473-8.772-2.964-13.15-4.472a1.905 1.905 0 0 0-2.02.312c-3.66 2.794-7.357 5.535-11.05 8.282-2.269 1.684-5 .984-5.803-1.503a4.318 4.318 0 0 1-.169-1.375c.047-4.641.094-9.288.197-13.929a1.9 1.9 0 0 0-.919-1.822c-3.587-2.5-7.187-5-10.687-7.58-.937-.691-1.625-1.71-2.428-2.579v-2.11c.81-1.493 2.128-2.187 3.728-2.652 4.537-1.35 9.031-2.841 13.543-4.279.313.36.566.741.894 1.07a72373.8 72373.8 0 0 0 30.852 30.852c.3.294.65.55.975.82z",fill:"#FED745"})),i||(i=b.createElement("path",{d:"M50.49 49.722c-.312-.275-.674-.525-.974-.825a71225.01 71225.01 0 0 1-30.852-30.853c-.313-.313-.597-.71-.894-1.066 1.369-4.5 2.769-8.984 4.081-13.5C22.314 1.891 23.086.666 24.64 0h1.875c.937.906 1.993 1.713 2.753 2.74 2.543 3.438 5 6.97 7.44 10.491a1.706 1.706 0 0 0 1.64.822c4.56-.1 9.122-.128 13.684-.237 1.672-.041 3 .462 3.797 1.978.822 1.562.256 2.915-.719 4.215-2.715 3.613-5.384 7.263-8.124 10.857a1.874 1.874 0 0 0-.29 2.018 1118.51 1118.51 0 0 1 4.44 13.047c.45 1.357.487 2.681-.644 3.79z",fill:"#FEEE4A"})),o||(o=b.createElement("path",{d:"M120.494 11.484c-1.363 3.297-4.338 2.475-7.031 2.6v3.338c-.028 2.147-1.547 3.7-3.566 3.668-1.971-.028-3.437-1.562-3.459-3.662-.016-1.081 0-2.163 0-3.366h-3.365c-2.147-.03-3.697-1.562-3.663-3.575.032-1.968 1.563-3.422 3.669-3.437h3.306c.203-2.603-.712-5.666 2.631-7.031h1.875c3.291 1.368 2.475 4.34 2.6 7.009 2.665.131 5.643-.697 7.009 2.6l-.006 1.856z",fill:"#FED746"})),a||(a=b.createElement("path",{d:"M97.51 97.263c1.529-1.522 3.582-1.619 5.088-.125a2861.032 2861.032 0 0 1 16.796 16.803c.453.456.738 1.075 1.1 1.616v1.64l-1.169 1.875c-.171-.209-.331-.431-.521-.625a10536.876 10536.876 0 0 0-20.58-20.58c-.22-.242-.476-.42-.713-.604z",fill:"#FED748"})),c||(c=b.createElement("path",{d:"M97.51 97.263c.237.196.493.374.712.593 6.875 6.856 13.735 13.717 20.58 20.581.191.191.35.413.522.625l-1.409.938h-1.875c-.825-.625-1.728-1.178-2.456-1.903a2980.772 2980.772 0 0 1-15.793-15.775c-1.61-1.622-1.694-3.456-.281-5.06z",fill:"#FEB455"})),l||(l=b.createElement("path",{d:"M108.306 91.757c-.918-.496-1.875-.768-2.484-1.38a7552.77 7552.77 0 0 1-29.74-29.713 3.498 3.498 0 0 1-.077-4.963c1.328-1.384 3.437-1.431 4.971-.103.147.128.282.272.42.41l29.06 29.062c1.775 1.775 1.928 4.013.282 5.431-.635.55-1.525.803-2.432 1.256z",fill:"#FED847"})),u||(u=b.createElement("path",{d:"M61.816 85.117c-.847-.484-1.853-.815-2.525-1.481a3247.57 3247.57 0 0 1-21.283-21.25c-1.594-1.597-1.613-3.781-.138-5.21 1.475-1.428 3.585-1.309 5.125.229 7.098 7.083 14.187 14.173 21.268 21.268 1.216 1.216 1.525 2.66.938 4.063-.572 1.31-1.797 2.116-3.385 2.381z",fill:"#FEB456"})),s||(s=b.createElement("path",{d:"M91.901 37.499V34.13c.031-2.1 1.494-3.637 3.469-3.66 1.975-.021 3.528 1.529 3.556 3.688.015 1.05 0 2.103 0 3.34h3.162c2.294 0 3.859 1.432 3.866 3.5.006 2.07-1.563 3.517-3.831 3.532h-3.197v3.31c-.022 2.187-1.5 3.728-3.525 3.718-2.025-.01-3.478-1.562-3.5-3.75v-3.284h-3.337c-2.163-.028-3.716-1.531-3.69-3.556.021-1.972 1.562-3.438 3.659-3.47 1.08-.012 2.165 0 3.368 0z",fill:"#FED746"})),f||(f=b.createElement("path",{d:"M26.282 84.373h-1.625c-3.75 0-5.384-1.044-5.403-3.488-.019-2.444 1.612-3.544 5.459-3.544h1.563v-3.296c.021-2.188 1.49-3.732 3.512-3.732 2.022 0 3.49 1.563 3.512 3.732v3.296h1.684c3.725 0 5.363 1.088 5.344 3.544-.019 2.456-1.634 3.488-5.4 3.488H33.3v3.353c-.028 2.156-1.543 3.71-3.568 3.675-1.975-.031-3.438-1.563-3.456-3.672-.007-1.053.006-2.106.006-3.356z",fill:"#FEB455"})),p||(p=b.createElement("path",{d:"M68.418 91.966c.03-2.118.674-3.26 2.068-3.86a3.365 3.365 0 0 1 3.894.7c1.465 1.4 2.878 2.86 4.312 4.295 4 4 8.002 7.998 12.006 11.993 1.097 1.088 1.543 2.332 1.143 3.822-.543 2.025-3.05 3.091-4.918 2.088a6.07 6.07 0 0 1-1.378-1.072c-5.25-5.235-10.506-10.46-15.706-15.744-.718-.731-1.134-1.76-1.421-2.222z",fill:"#FEB456"})),d||(d=b.createElement("path",{d:"M61.184 60.67c1.607-1.5 3.516-1.446 5.163.194 3.375 3.354 6.741 6.718 10.1 10.09 5.32 5.326 10.641 10.65 15.964 15.976 1.625 1.631 1.675 3.531.185 5.175-.238-.203-.488-.388-.707-.606-10.012-10-20.022-20.01-30.03-30.032-.243-.243-.45-.528-.675-.797z",fill:"#FED748"})),h||(h=b.createElement("path",{d:"M61.184 60.67c.225.268.431.553.675.797 10 10.014 20.01 20.025 30.03 30.03.219.22.469.404.706.607-1.637 1.756-3.868 1.172-5.071-.044-1.62-1.634-3.257-3.256-4.885-4.884a29231.257 29231.257 0 0 0-21.274-21.284c-1.712-1.716-1.762-3.678-.18-5.222z",fill:"#FEB454"})),m||(m=b.createElement("path",{d:"M56.444 40.026c.266-1.525.834-2.575 2.019-3.253a3.343 3.343 0 0 1 3.553.05c.364.226.697.497.994.807 2.6 2.585 5.192 5.177 7.777 7.775 1.69 1.697 1.794 3.75.294 5.287-1.5 1.538-3.562 1.413-5.278-.294-2.628-2.612-5.275-5.203-7.837-7.88-.672-.688-1.022-1.654-1.522-2.492zM113.051 66.795a3.515 3.515 0 1 1 3.459-3.54 3.547 3.547 0 0 1-3.459 3.54zM81.357 16.368a3.515 3.515 0 1 1-3.522-3.478 3.54 3.54 0 0 1 3.522 3.478z",fill:"#FED848"})),v||(v=b.createElement("path",{d:"M54.368 116.013a3.515 3.515 0 1 1 3.55-3.437 3.545 3.545 0 0 1-3.55 3.437zM7.58 101.951a3.517 3.517 0 0 1-2.555-5.98 3.516 3.516 0 0 1 6.023 2.448 3.545 3.545 0 0 1-3.469 3.532z",fill:"#FEB557"})))}var K,N,V,Y,_,G,J,U,X,$,ee,ne,te=b.forwardRef(H),re=(t.p,t(7193)),ie=t(3349),oe=t(6618),ae=t(168),ce=t(6031),le=t(7115),ue=ce.ZP.div(K||(K=(0,ae.Z)(["\n     width: 100vw;\n     min-height: 100vh;\n     display: flex;\n     ",";\n     padding-bottom: 100px;\n"])),(function(e){if(e.openMobileMenu||e.openPopup)return(0,ce.iv)(N||(N=(0,ae.Z)(["\n                    filter: blur(10px);\n               "])))})),se=ce.ZP.div(V||(V=(0,ae.Z)(["\n     display: flex;\n     height: fit-content;\n     margin: 0 auto;\n     margin-top: ",";\n     flex-direction: ",";\n     gap: ",";\n     justify-content: center;\n     align-items: center;\n     position: ",";\n     top: ",";\n     left: ",";\n     transform: ",";\n     width: ",";\n     text-align: center;\n"])),(function(e){return e.marginTop}),(function(e){return e.flexDeirection}),(function(e){return e.gap}),(function(e){return e.position}),(function(e){return e.top}),(function(e){return e.left}),(function(e){return e.transform}),(function(e){return e.width})),fe=ce.ZP.div(Y||(Y=(0,ae.Z)(["\n     width: 1257px;\n     margin: 80px auto auto 370px;\n     @media "," {\n          width: calc(100vw - 50px - 50px);\n          margin: 80px 50px auto 50px;\n     }\n     @media "," {\n          width: 90vw;\n          margin: 40px auto 0 auto;\n     } ;\n"])),le.Z.laptop,le.Z.mobile),pe=ce.ZP.h2(_||(_=(0,ae.Z)(["\n     all: unset;\n     text-shadow: -2px 3px 1px rgba(0, 0, 0, 0.1),\n          -1px 1px 2px rgba(255, 255, 255, 0.25);\n     font-family: inherit;\n     font-size: ",";\n     font-weight: 900;\n     line-height: 1.2;\n     color: ",";\n     margin-top: ",";\n     @media "," {\n          font-size: ",";\n     } ;\n"])),(function(e){return e.fontSize||"5rem"}),O.Z.white,(function(e){return e.marginTop}),le.Z.mobile,(function(e){return e.fontSizeMobile||"3.2rem"})),de=ce.ZP.h5(G||(G=(0,ae.Z)(["\n     all: unset;\n     font-family: inherit;\n     font-size: ",";\n     font-weight: ",";\n     line-height: 1.5;\n     color: ",";\n     margin-top: ",";\n     @media "," {\n          font-size: ",";\n          width: ",";\n     } ;\n"])),(function(e){return e.fontSize||"1.8rem"}),(function(e){return e.fontWeight}),O.Z.white,(function(e){return e.marginTop}),le.Z.mobile,(function(e){return e.fontSizeMobile||"2.4rem"}),(function(e){return e.mobileWidth})),he=ce.ZP.div(J||(J=(0,ae.Z)(["\n     position: relative;\n     width: fit-content;\n"]))),me=ce.ZP.input(U||(U=(0,ae.Z)(["\n     max-width: 324px;\n     height: 30px;\n     display: flex;\n     align-items: center;\n     padding: 12px 24px;\n     border-radius: 15px;\n     background-color: rgba(255, 255, 255, 0.3);\n     border: none;\n     margin-top: 24px;\n     color: ",";\n     font-family: inherit;\n     font-size: 2.4rem;\n     font-weight: 500;\n     line-height: 1.25;\n     &::placeholder {\n          font-family: inherit;\n          font-size: 1.8rem;\n          font-weight: bold;\n          line-height: 1.2;\n          color: ",";\n     }\n     &:focus-visible {\n          outline: 0;\n     }\n"])),O.Z.white,O.Z.white),ve=ce.ZP.div(X||(X=(0,ae.Z)(["\n     display: flex;\n     flex-direction: column;\n     gap: 23.5px;\n     margin-top: 65px;\n     @media "," {\n          margin-top: 36px;\n     }\n"])),le.Z.mobile),xe=ce.ZP.div($||($=(0,ae.Z)(["\n     position: relative;\n     width: 100%;\n     min-height: 88px;\n     display: flex;\n     flex-direction: column;\n     cursor: pointer;\n"]))),ge=ce.ZP.hr(ee||(ee=(0,ae.Z)(["\n     width: 100%;\n     height: 1px;\n     opacity: 0.6;\n     background-color: ",";\n     margin-top: 13.5px;\n"])),O.Z.white),ye=ce.ZP.button(ne||(ne=(0,ae.Z)(["\n     all: unset;\n     cursor: pointer;\n     z-index: 3;\n"]))),be=t(184),Ze=function(e){var n=e.pageProps,t=(0,E.useQueryClient)(),r=(0,Z.I0)(),i=(0,w.s0)(),o=(0,b.useState)([]),a=(0,y.Z)(o,2),c=a[0],l=a[1],u=(0,b.useState)(c),s=(0,y.Z)(u,2),f=s[0],p=s[1],d=(0,b.useState)(""),h=(0,y.Z)(d,2),m=h[0],v=h[1],F=(0,b.useState)(!1),S=(0,y.Z)(F,2),q=S[0],L=S[1],R=(0,b.useState)(null),H=(0,y.Z)(R,2),K=H[0],N=H[1],V=(0,b.useState)(!1),Y=(0,y.Z)(V,2),_=Y[0],G=Y[1],J=(0,b.useState)(!1),U=(0,y.Z)(J,2),X=U[0],$=U[1],ee=(0,Z.v9)((function(e){return e.headerSlice.renderPraimaryBackground})),ne=(0,Z.v9)((function(e){return e.headerSlice.openPopup})),ae=(0,Z.v9)((function(e){return e.headerSlice.openMap})),ce=(0,Z.v9)((function(e){return e.headerSlice.openMobileMenu})),le=function(e,n,t){var r=(0,b.useState)([]),i=(0,y.Z)(r,2),o=i[0],a=i[1];return(0,b.useEffect)((function(){var r=[];if(""===n)r=e;else{var i,o=(0,C.Z)(e);try{for(o.s();!(i=o.n()).done;){var c=i.value;if(t.length>0){var l,u=(0,C.Z)(t);try{for(u.s();!(l=u.n()).done;)if(c[l.value].toLowerCase().includes(n.toLowerCase())){r.push(c);break}}catch(s){u.e(s)}finally{u.f()}}else{if(!c.toLowerCase().includes(n.toLowerCase()))continue;r.push(c)}}}catch(s){o.e(s)}finally{o.f()}}a(r)}),[e,n]),o}(c,m,["city","country"]);(0,b.useEffect)((function(){0===ze.length&&($(!0),setTimeout((function(){return $(!1)}),5e3))}),[]),(0,b.useEffect)((function(){n.noResultAndEnter&&i("/home",{state:{noResultAndEnter:n.noResultAndEnter}})}),[n.noResultAndEnter]),(0,b.useEffect)((function(){if(t.getQueryData("favorites"))l(t.getQueryData("favorites").data.results);else{var e=function(){var e=(0,g.Z)((0,x.Z)().mark((function e(){var r,i;return(0,x.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.fetchQuery("favorites",j.y);case 3:i=e.sent,l(null===i||void 0===i||null===(r=i.data)||void 0===r?void 0:r.results),e.next=11;break;case 7:e.prev=7,e.t0=e.catch(0),n.setServerError(!0),console.log(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}();e()}}),[]),(0,b.useEffect)((function(){p(le)}),[le]);var Ze=(0,E.useQuery)("favorites",j.y,{cacheTime:1/0,staleTime:1/0,onSuccess:function(e){var n;l(null===e||void 0===e||null===(n=e.data)||void 0===n?void 0:n.results)},onError:function(e){console.log(e),n.setServerError(!0)}}).isLoading,we=(0,E.useMutation)(z.G,{onSuccess:function(){t.invalidateQueries("favorites"),L(!0),setTimeout((function(){return L(!1)}),4e3),G(!1)},onError:function(e){console.log(e),n.setServerError(!0)}}).mutate,Ee=!1;ae&&"/favorites"===location.pathname&&(Ee=!0);var je,ze=(0,E.useQueries)(c.map((function(e){return{queryKey:["getCoords",e.city],queryFn:function(){return M(e.city).then((function(e){var n,t;if(e&&e[0])return{lat:null===(n=e[0])||void 0===n?void 0:n.lat,lng:null===(t=e[0])||void 0===t?void 0:t.lon}})).catch((function(e){console.log(e),n.setServerError(!0)}))},staleTime:1/0,cacheTime:1/0,enabled:Ee}}))),Fe=(0,E.useQueries)(ze.map((function(e){return{queryKey:["coords",e],queryFn:function(){return(0,T.Q)(e.data).then((function(e){return null===e||void 0===e?void 0:e.Key})).catch((function(e){console.log(e),n.setServerError(!0)}))},staleTime:1/0,cacheTime:1/0,enabled:Ee}}))),Se=(0,E.useQueries)(Fe.map((function(e){return{queryKey:["hourlyForcastForCityInMap",e.data],queryFn:function(){return k(e.data).then((function(e){var n,t,r,i,o,a;if(e&&e[0])return{temp:null===(n=e[0])||void 0===n||null===(t=n.Temperature)||void 0===t?void 0:t.Value,unit:null===(r=e[0])||void 0===r||null===(i=r.Temperature)||void 0===i?void 0:i.Unit,iconPhrase:null===(o=e[0])||void 0===o?void 0:o.IconPhrase,icon:null===(a=e[0])||void 0===a?void 0:a.WeatherIcon}})).catch((function(e){console.log(e),n.setServerError(!0)}))},staleTime:36e5,cacheTime:36e5,enabled:Ee}}))),Me=function(){var e=(0,g.Z)((0,x.Z)().mark((function e(){var n;return(0,x.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:K&&(n={key:Number(K.key),city:K.city,country:K.country},we(n));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),ke=function(){ne&&r((0,B.zI)({popupType:"logout"})),_&&G(!1),n.openSearchBoxMobile&&n.setOpenSearchBoxMobile(!1),ce&&r((0,B.HT)())};return Ze?(0,be.jsx)(D.Z,{fixedCenter:!0,loading:Ze,size:30,color:"#FFFFFFF"}):ae?(0,be.jsxs)(be.Fragment,{children:[(0,be.jsx)(A.Z,{serverError:n.serverError,setServerError:n.setServerError,citiesHourlyForcast:Se,markerCoordsArray:ze,coords:n.coords,zoom:4,center:null===(je=ze[0])||void 0===je?void 0:je.data}),0===ze.length&&X&&(0,be.jsx)(Q.Z,{variant:"success",backgroundColor:O.Z.fadeText,mobileWidth:"80vw",position:"fixed",mobileBottom:"70%",icon:(0,be.jsx)(oe.r,{}),message:"add cites to your favorites and watch their forecast on map"})]}):c&&!c.length&&""===m?(0,be.jsx)(be.Fragment,{children:(0,be.jsx)(ue,{openPopup:ce||ne||_,onClick:ke,renderPraimaryBackground:ee,children:(0,be.jsxs)(se,{flexDeirection:"column",marginTop:"66px",children:[(0,be.jsx)(P.x,{children:(0,be.jsx)(te,{})}),(0,be.jsx)(pe,{fontSize:"3.2rem",marginTop:"36px",children:"My favorites"}),(0,be.jsx)(de,{children:"Favorites list is empty."})]})})}):(0,be.jsxs)(be.Fragment,{children:[(0,be.jsxs)(ue,{onClick:ke,renderPraimaryBackground:ee,openPopup:ce||ne||_,children:[(0,be.jsxs)(fe,{children:[(0,be.jsx)(pe,{children:"Favorites"}),(0,be.jsxs)(he,{children:[(0,be.jsx)(me,{placeholder:"Search from favorite...",value:m,onChange:function(e){return v(e.target.value)}}),(0,be.jsx)(P.x,{position:"absolute",right:"24px",top:"50%",transform:"translate(0%,-50%)",children:(0,be.jsx)(I.r,{})})]}),f&&f.length>0&&(0,be.jsx)(ve,{children:f.map((function(e){return(0,be.jsxs)(xe,{children:[(0,be.jsx)(de,{fontSize:"3.2rem",fontWeight:"bold",onClick:function(){i("/home",{state:{selectedCityData:{key:e.key,LocalizedName:e.city,Country:{LocalizedName:e.country}}}})},children:e.city}),(0,be.jsx)(de,{fontSize:"2.4rem",fontSizeMobile:"1.8rem",fontWeight:"500",marginTop:"4px",children:e.country}),(0,be.jsx)(ge,{}),(0,be.jsx)(ye,{onClick:function(){_||(N(e),G(!0))},children:(0,be.jsx)(P.x,{position:"absolute",top:"50%",right:"10px",transform:"translateY(-50%)",children:(0,be.jsx)(re.r,{})})})]},e.key)}))}),0===f.length&&""!==m&&(0,be.jsxs)(se,{flexDeirection:"column",position:"absolute",top:"50%",left:"50%",transform:"translate(-50% , -50%)",width:"364px",children:[(0,be.jsx)(P.x,{children:(0,be.jsx)(te,{})}),(0,be.jsxs)(de,{marginTop:"36px",fontSizeMobile:"1.4rem",mobileWidth:"70vw",children:['We couldn\u2019t find any city named "',m,'" in the Favorites list, please try again.']})]})]}),q&&K&&(0,be.jsx)(Q.Z,{padding:"10px",mobileWidth:"300px",mobileHeigt:"50px",mobileTransform:"translate(-50%, -100%)",animation:!0,variant:"success",icon:(0,be.jsx)(ie.r,{}),message:"".concat(K.city," - ").concat(K.country," has removed from favorites")})]}),_&&(0,be.jsx)(W.Z,{popupType:"removeFromFavorites",message:"Are you sure you want to remove ".concat(null===K||void 0===K?void 0:K.city," from favorites list?"),cancelMessage:"Keep it",title:"Remove from favorites",continueButtonText:"Yes, remove",callback:function(){Me()},cancelFunction:function(){G(!1)}})]})}}}]);
//# sourceMappingURL=253.199cea40.chunk.js.map