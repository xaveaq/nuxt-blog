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
  - nuxt
  - cafe24
  - ga4
  - cross_domain
  - page_view
  - ga_session_id
---

## 크로스 도메인 데이터 추적이란

<b>크로스 도메인</b>(Cross domain)이라는 말은 사실 자바스크립트 기반의 웹 개발 환경에서 널리 쓰이고, 구글링되는 키워드입니다. 일명 '교차 도메인'이라고 불리며, 이러한 교차 도메인 상황으로 인한 CORS 에러가 많은 프론트엔드 개발자들의 머리를 싸메게 만들기도 합니다.\([\# MDN 참고문서 링크](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)\)

그러나 지금 이 본문에서 살펴볼 '크로스 도메인'은 <b>구글 애널리틱스</b>를 통한 데이터 수집 환경에서 차용하는 개념입니다. 구글 애널리틱스가 크로스 도메인이라는 키워드를 언급하는 상황은 다음과 같을 때 입니다.

1. 유저가 aaaa.com 사이트에서 어떤 개체를 클릭
2. 이 클릭으로 인해 유저가 bbbb.com 사이트의 어떤 페이지로 리다이렉트
3. 유저가 다시 aaaa.com 사이트로 복귀
4. 이렇게 서로 다른 도메인 간 리다이렉트 & 복귀가 이뤄진 유저에 대해, 데이터 분석단에서는 <b>단일 유저로 식별해야 할 것</b>
5. 이를 위해 구글 애널리틱스에서 크로스 도메인 기능을 설정

이러한 상황은 생각보다 빈번하게 발생합니다. 이커머스 서비스를 예로 들면, aaaa.com 사이트에서는 다양한 상품들에 대한 각각의 상세 페이지를 제공하면서 장바구니 추가와 결제를 비롯한 모든 구매 기능은 bbbb.com 사이트의 이커머스 기능을 가져다 쓰는 경우입니다. Amazon이나 Shopify, 또는 Cafe24나 고도몰과 같이 턴키 방식으로 모든 이커머스 기능을 제공하는 CMS를 사용한다면 모를까. 자체 D2C 독립몰을 운영하는 경우 개인정보보호 이슈나 결제에 관한 여러 재무환경으로 인해 이와 같이 결제 기능만을 일종의 위탁 페이지에서 처리하는 경우가 많습니다. 크로스 도메인 설정은 바로 이러한 환경 속에서, 데이터를 분석하는 담당자가

<a href="https://whitelatte4.cafe24.com/order/basket.html" target="_blank">Cafe24 장바구니</a>
