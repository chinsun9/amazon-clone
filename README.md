# Amazon clone

- https://www.youtube.com/watch?v=RDV3Z1KCBvo 보고 따라만들기!

## command

```
firebase login
firebase init
npm run build
firebase deploy
firebase emulators:start
firebase deploy --only functions
firebase deploy --only hosting
firebase hosting:disable
```

## firebase 호스팅 종료

- firebase cli로 명령을 친다.
- firebase hosting:disable

## firsebase 함수 삭제

- 브라우저로 firebase console에 접속하여 삭제한다.

## etc

- functions ; full back-end
- src ; app ; front-end

## firebase 설정

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth.uid != null;
    }
  }
}
```

- Uncaught (in promise) FirebaseError: Missing or insufficient permissions.
- 권한 설정

> HTTP Error: 400, Billing account for project 'clone-00000' is not found. Billing must be enabled for activation of service(s) 'cloudbuild.googleapis.com,containerregistry.googleapis.com' to proceed.

- 파이어베이스 요금제 업그레이드.

## stripe api 에러 핸들링

- 결제 api가 402 에러를 뱉은 적이 있는데, 에러 핸들링.
- 결제 실패시 무한 대기상태. 사용자에게 아무런 피드백이 없었음.

## 질문

```jsx subtotal.js 35 line
<button onClick={(e) => history.push("/payment")}>Proceed to Checkout</button>
```

- Link랑 useHistory 차이..
- 부동소수점 계산문제.
- .js vs .jsx

> Uncaught Error in snapshot listener: FirebaseError: Missing or insufficient permissions.

- 오더 페이지에서 로그아웃했는데 Uncaught Error in snapshot listener 나오는 오류
- snapshot 리스닝을 종료시켜줘야함.
