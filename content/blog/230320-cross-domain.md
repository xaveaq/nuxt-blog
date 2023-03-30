---
title: 구글 애널리틱스(GA4)에서 크로스 도메인 데이터 추적하기
description: Nuxt.js 웹 페이지에서 Cafe24 페이지로 이동하는 경우에서의 크로스 도메인 설정과 데이터 수집
slug: 230320-cross-domain
author: xaveaq
category: Google Analytics 4
datetime: 2023. 03. 20. 09:00
language: Korean
featured: None
tags:
  - cross_domain
  - ga4
  - client_id
  - 1st_party_cookie
  - page_view
  - ga_session_id
---

## 1. 크로스 도메인이란

<b>크로스 도메인</b>(Cross domain)이라는 말은 사실 자바스크립트 기반의 웹 개발 환경에서 널리 쓰이고, 구글링되는 키워드입니다. 일명 '교차 도메인'이라고 불리며, 이러한 교차 도메인 상황으로 인한 CORS 에러가 많은 프론트엔드 개발자들의 머리를 싸메게 만들기도 합니다. <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS" target="_blank" style="color:lightgray;font-size:1rem;text-align:right;text-decoration:none;margin:0 4px 0 4px;">#CORS 관련 MDN 문서</a>

그러나 지금 이 본문에서 살펴볼 '크로스 도메인'은 <b>구글 애널리틱스</b>를 통한 데이터 수집 환경에서 차용하는 개념입니다. 구글 애널리틱스가 크로스 도메인이라는 키워드를 언급하는 상황은 다음과 같을 때 입니다.

1. 유저가 aaaa.com 사이트에서 어떤 개체를 클릭
2. 이 클릭으로 인해 유저가 bbbb.com 사이트의 어떤 페이지로 리다이렉트
3. 유저가 다시 aaaa.com 사이트로 복귀
4. 이렇게 서로 다른 도메인 간 리다이렉트 & 복귀가 이뤄진 유저에 대해, 데이터 분석단에서는 <b>단일 유저로 식별해야 할 것</b>
5. 이를 위해 구글 애널리틱스에서 크로스 도메인 기능을 설정

이러한 상황은 생각보다 빈번하게 발생합니다. 이커머스 서비스를 예로 들면, aaaa.com 사이트에서는 다양한 상품들에 대한 각각의 상세 페이지를 제공하면서 장바구니 추가와 결제를 비롯한 모든 구매 기능은 bbbb.com 사이트의 이커머스 기능을 가져다 쓰는 경우입니다. Amazon이나 Shopify, 또는 Cafe24나 고도몰과 같이 턴키 방식으로 모든 이커머스 기능을 제공하는 CMS를 사용한다면 모를까. 자체 D2C 독립몰을 운영하는 경우 개인정보보호 이슈나 결제에 관한 여러 재무환경으로 인해 이와 같이 결제 기능만을 일종의 위탁 페이지에서 처리하는 경우가 많습니다. 구글 애널리틱스의 크로스 도메인 설정 기능은 바로 이렇게 Outbound redirection 및 사이트 복귀가 요구되는 행동 여정을 측정하기 위해 필요한 기능입니다. 이 기능은 데이터 분석가로 하여금 Referral 유입 건으로 추가 계수하지 않게 합니다. 따라서 보다 더 정확하게 유저 수를 판단하도록 도움을 줄 수 있습니다.

## 2. 크로스 도메인 기능 설정하기

### 2-1. 유니버셜 애널리틱스 크로스 도메인 기능 설정

지금까지 유니버셜 애널리틱스(Google Analytics 3, 이하 'UA') 체제에서 크로스 도메인 설정을 하기 위해서는 구글 태그 매니저(Google Tag Manager, 이하 'GTM')에서도 몇 가지 부가설정을 해야했습니다.

1. UA에서 추천제외 목록(Referral Exclusion)에 타겟 도메인 추가
2. GTM에서 페이지 뷰와 관련된 태그에 `cookieDomain` 파라미터를 추가하고, 해당 값은 `auto`로 감지하도록 설정
3. GTM에서 유니버셜 애널리틱스 연동과 관련된 태그에 'Cross Domain Tracking'을 설정하고 'Auto Link Domains' 항목에 타겟 도메인 추가
4. GTM에서 타겟 도메인으로의 이동과 관련된 태그에 `allowLinker` 파라미터를 추가하고, 해당 값은 `true`로 설정

위의 설정에 따르면, GTM에서는 2 ~ 4까지의 과정을 통해 유저에 대한 Client ID 값(즉, 1st Party Cookie 값)을 타겟 도메인에 부여하게 됩니다. 더 정확하게 이야기하자면, 유저가 타겟 도메인으로 리다이렉션할 때 GTM 내 `cookieDomain` 파라미터와 `allowLinker` 파라미터의 값 존재로 인해 타겟 도메인의 URL 파라미터에 Client ID 값이 추가됩니다. 이를 통해 유니버셜 애널리틱스에서는 유저가 저 타겟 도메인으로부터 다시 원래 사이트로 복귀 시 Referral 유입 유저라고 판단하지 않고 크로스 도메인을 이행한 단일 유저라고 식별할 수 있게 되는 것입니다.

### 2-2. 구글 애널리틱스 4 크로스 도메인 기능 설정

구글 애널리틱스 4(Google Analytics 4, 이하 'GA4') 체제로 바뀌면서, 크로스 도메인 설정하는 방법이 꽤 심플하게 개선되었습니다. 해당 데이터 스트림에 대한 Cross domain linking 설정 하나만으로도 기존 UA와 GTM에서 수행해야 했던 모든 단계를 데이터 스트림 내 한번의 설정으로 끝낼 수 있게 되었습니다.

1. GA4의 Admin 메뉴에서 <b>데이터 스트림</b> 메뉴에 들어간 후 <b>태그 관련 설정</b> 메뉴로 진입합니다.(Configure tag settings)
2. <b>도메인 설정</b> 메뉴로 진입합니다.(Configure your domains)
3. Match type이 `Contains`로 하여 메인으로 제공하는 도메인과 타겟 도메인을 모두 추가해놓습니다. 이 경우 프로토콜(http, https) 정보와 URL 파라미터는 모두 제외한 채, 오직 도메인 정보만 기입해야 합니다.

<br />

![image](https://user-images.githubusercontent.com/123706649/228174922-96607a57-48d5-4a37-b248-2ec1d6679b85.png)

![image](https://user-images.githubusercontent.com/123706649/228178306-a839bc70-5f06-418c-9e65-d13f6978d47f.png)

![image](https://user-images.githubusercontent.com/123706649/228178883-8008058b-ad72-4cc6-894d-0d132aad9a7c.png)

![image](https://user-images.githubusercontent.com/123706649/228179749-1412516c-a316-4343-b8a6-ad3979d5009e.png)

위와 같은 설정을 통해, GA4 안에서 타겟 도메인에서 메인 사이트로 돌아오는 유저들에 대한 <b>1st Party Cookie</b> 기반의 유저 식별 통합은 준비가 끝났습니다. <a href="https://support.google.com/analytics/answer/10071811" target="_blank" style="color:lightgray;font-size:1rem;text-align:right;text-decoration:none;margin:0 4px 0 4px;">#크로스도메인 관련 구글 문서</a> <a href="https://support.google.com/analytics/answer/10327750?hl=ko" target="_blank" style="color:lightgray;font-size:1rem;text-align:right;text-decoration:none;margin:0 4px 0 4px;">#Referral 제외 관련 구글 문서</a>

## 3. 메인 서비스에 GA4 및 GTM 설정하기

서비스에 GA4 추적코드와 GTM 컨테이너 스니펫이 삽입되어야 GA4의 데이터 스트림에서 유저의 행동여정을 분석할 수 있습니다. 일단 본문은 Nuxt.js(v2.16.3)를 통해 개발된 서비스를 가정하고 있습니다.

### 3-1. Nuxt.js 프로젝트에 GA4 설정

1. 먼저 vue-gtag 의존성을 설치합니다.
2. Nuxt.js 프로젝트의 `plugins` 디렉터리 안에 `vue-gtag.js` 파일을 생성한 후, GA4 Measurement ID를 저장하는 코드를 작성합니다.
3. 마지막으로 Nuxt.js 프로젝트의 루트 경로에 있는 `nuxt.config.js` 파일 안에 `plugins` 속성의 값으로써 `vue-gtag.js` 파일의 상대경로를 추가하면 됩니다.

```shell
yarn add vue-gtag
```

```javascript
// /plugins/vue-gtag.js

import Vue from 'vue'
import VueGtag from 'vue-gtag'

Vue.use(VueGtag, {
  config: { id: 'G-OOOOOOOOOO' },
})
```

```javascript
// /nuxt-config.js

export default {
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/aaaaa.js', ... , '@/plugins/vue-gtag'],
}

```

### 3-2. Nuxt.js 프로젝트에 GTM 설정

1. 먼저 @nuxtjs/gtm 의존성을 설치합니다.
2. Nuxt.js 프로젝트의 루트 경로에 있는 `nuxt.config.js` 파일 안에 새롭게 `gtm` 속성을 추가하고, 이 속성의 값으로써 GTM 컨테이너 ID를 지정합니다.
3. 혹시 모르니, 강제로 매 컴포넌트의 라우팅에서 GTM 컨테이너 ID가 명시될 수 있도록, Nuxt.js 프로젝트의 `layouts` 디렉터리에 있는 `default.vue` 파일에 GTM 컨테이너에 대한 noscript 구문을 iframe 형식으로 삽입합니다.
4. 그리고나서 다시 Nuxt.js 프로젝트의 루트 경로에 있는 `nuxt.config.js` 파일로 돌아가서, `head.script` 속성의 값으로써 GTM 컨테이너에 대한 script 구문이 innerHtml 형식으로 삽입이 이뤄지도록 합니다.

```shell
yarn add @nuxtjs/gtm
```

```javascript
// /nuxt.config.js

export default {
  gtm: {
    id: 'GTM-OOOOOOO',
  },
}
```

```vue
<!-- /layouts/default.vue -->

<template>
  <div>
    <noscript v-html="iFrameCode" />

    <div class="bg-white">
      <Header />
      <Nuxt />
      <Footer />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // body 영역 안에 넣을 GTM 컨테이너 noscript 스니펫
      iFrameCode:
        '<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-OOOOOOO" height="0" width="0" style="display: none; visibility: hidden" />',
    }
  },
  name: 'Default',
}
</script>
...
```

```javascript
// /nuxt.config.js

export default {
  head: {
    script: [
      {
        // head 영역 안에 넣을 GTM 컨테이너 script 스니펫
        innerHTML: `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-OOOOOOO');`,
      },
    ],
  },
}
```

### 3-3. GTM 구성 및 GA4 반영

이제 메인 서비스에서 측정할 이벤트들을 GTM과 GA4에서 정의합니다. GTM에서 적절한 태그들과 그에 따른 트리거 및 변수들을 커스텀 생성하면 됩니다. 이때 <b>GTM의 태그 내 파라미터로 추가한 것들은 GA4의 Custom Definition에 동일한 이름으로 추가되어야 합니다.</b> 특별히 지표(Metric, 또는 '메트릭')로써 의도한 파라미터가 아니라면, 대부분은 Event Parameter 또는 User Property의 분류에 맞춰서 차원(Dimension, 또는 '디멘젼') 형태로 저장됩니다. 이렇게 저장된 디멘젼들은 서비스가 운영됨에 따라 그에 맞게 수집된 값들이 존재할 것이므로 데이터 분석 시 산출 조건으로 활용할 수 있게 됩니다.

참고로, '23년 3월 현재 GA4에서 허용하는 Custom Definition 추가 한계는 다음과 같습니다. <a href="https://support.google.com/firebase/answer/10075209?hl=ko" target="_blank" style="color:lightgray;font-size:1rem;text-align:right;text-decoration:none;margin:0 4px 0 4px;">#맞춤 측정기준 관련 구글 문서</a>

| 항목                                 | GA4                     | GA4 360                  |
| ------------------------------------ | ----------------------- | ------------------------ |
| Event Parameter 범주에 속하는 디멘젼 | 최대 50개까지 추가 가능 | 최대 125개까지 추가 가능 |
| User Property 범주에 속하는 디멘젼   | 최대 25개까지 추가 가능 | 최대 100개까지 추가 가능 |

## 4. 타겟 도메인 페이지에 GTM 설정하기

너무나 당연하게도, 메인 서비스와 타겟 도메인 간 크로스 도메인 분석을 위해서는 반드시 두 사이트에 대한 데이터 수집이 하나의 GA4 프로퍼티에서 이뤄져야 합니다. 따라서 타겟 도메인에도 메인 서비스에 삽입된 것과 동일한 GTM 컨테이너 스니펫과 GA4 추적코드가 설정되어야 합니다. GA4 추적코드는 아래와 같이 GA4 Admin 메뉴 중 데이터 스트림 설정화면에서 확인할 수 있습니다.

![image](https://user-images.githubusercontent.com/123706649/228407088-5ba823b8-c69c-4e6a-ab30-c5b18cadb65f.png)

![image](https://user-images.githubusercontent.com/123706649/228407354-eac8c88f-fc1e-4c41-b7fe-14d8a65edf32.png)

<br />

이제 타겟 도메인 페이지에 이 GA4 추적코드와 GTM 컨테이너 스니펫을 삽입하도록 합니다. 참고로 본문은 타겟 도메인을 Cafe24로 상정하였습니다.

1. Cafe24의 Admin에 접속합니다. 좌측 패널에서 가장 아래에 위치한 <b>'쇼핑몰 설정'</b> 메뉴를 찾아 들어갑니다. 그러면 서브 메뉴가 collapse 형식으로 열립니다.
2. 활성화된 서브 메뉴 가운데 두번째 섹션에 위치한 <b>'기본 설정'</b> 메뉴를 찾아 들어갑니다. 그러면 다음과 같이 쇼핑몰 정보 등을 설정할 수 있는 메뉴 화면에 나옵니다. 여기서 <b>'검색 엔진 최적화(SEO)'</b> 메뉴를 클릭합니다.
3. 검색 엔진 최적화 설정화면에서 가장 하단에 있는 <b>'고급설정'</b> 박스를 클릭합니다. 그러면 여러 추가 설정 collapse 메뉴들이 나오는데, 여기서 가장 아래에 있는 <b>'코드 직접입력'</b> 메뉴를 클릭합니다.
4. 이제 Cafe24 사이트 전체의 head 영역과 body 영역에 공통 적용할 수 있는 코드를 작성할 수 있습니다. 여기에 GA4 추적코드와 GTM 컨테이너 스니펫을 입력하도록 합니다. PC 쇼핑몰뿐만 아니라 모바일 쇼핑몰 탭에서도 동일하게 코드들을 입력합니다.

<br />

![image](https://user-images.githubusercontent.com/123706649/228409989-dd30a27c-72c1-4713-87b4-798ec0f68383.png)

![image](https://user-images.githubusercontent.com/123706649/228410265-41fa6abe-75fc-453e-8c80-4bae1b93f08e.png)

![image](https://user-images.githubusercontent.com/123706649/228410640-3d763325-7e99-47b0-bfbf-4d84f6b8ecb6.png)

![image](https://user-images.githubusercontent.com/123706649/228410812-ee66a350-bfe8-4b00-bebb-a12421af18a5.png)

![image](https://user-images.githubusercontent.com/123706649/228411654-3e743e66-94b9-4fef-8933-01a91abb4658.png)

<br />

## 5. 크로스 도메인 데이터 확인

이제 아웃바운드 링크로의 유저 여정을 크로스 도메인 설정으로 바라볼 준비가 되었습니다. 아래의 테스트 링크를 클릭하면, Cafe24에 이미 구성해놓은 장바구니 페이지로 리다이렉션이 이뤄집니다. 그리고 해당 Cafe24 페이지에서 다시 본 블로그 사이트로 되돌아오고 나서, 이러한 과정에서의 일련의 데이터들을 GA4로 살펴보도록 하겠습니다.

<br />

<a href="https://whitelatte4.cafe24.com/order/basket.html" target="_blank" style="font-weight:light;color:pink;text-decoration:none;"><span style="background-color:black;border:0.5rem outset pink;outline-offset: 0.5rem;;border-radius: 12px;margin:2rem 1.5rem;padding:0.6rem;text-decoration:none;">Cafe24 장바구니 바로가기</span></a>

<br />
