## 프로젝트 개요
- 프로젝트 명 : OOTW(Outfit Of The Weather)
- 프로젝트 소개 : 날씨에 맞게 코디를 정하는 데에 도움을 줄 수 있는 소셜 웹사이트
- 진행기간 : 24.09.12 ~ 24.09.23
- 배포 링크 : https://outfit-of-the-weather.vercel.app/
- 깃허브 링크 : https://github.com/jeongol/outfit-of-the-weather

## 역할 분배
|이름|역할|담당업무|
|------|---|---|
|이정곤|팀장|날씨 API, 메인 페이지|
|김경혜|팀원|마이 페이지, 스크랩(좋아요) 기능|
|장종호|팀원|로그인/회원가입 페이지, 리스트 페이지, 최종 CSS|
|노용철|팀원|게시글 상세 페이지, 게시글 작성, 수정 페이지, 댓글|

## 개발 환경

- 프레임워크 :  Next.js

- 언어 :  Typescript

- CSS : tailwind css

- Baas : supabase

- #### 전역 상태 관리 라이브러리

  -- 클라이언트 :  Zustand

  -- 서버 :  TanStack Query

- #### API

  -- 날씨 API : openweathermap
## 주요 기능
### 홈
- 현재 날씨
<img src="https://github.com/user-attachments/assets/19d9f6a0-28ae-4762-af75-d35c61614585" alt="현재 날씨"/>
- 오늘의 게시글
<img src="https://github.com/user-attachments/assets/aa99dc43-c48c-4dc4-ae1d-044b017f3099" alt="오늘의 게시글"/>

### 리스트 페이지 
- 필터링
<img src="https://github.com/user-attachments/assets/9b416382-6433-4114-b937-9874b559aa6f" alt="필터링"/>
<img src="https://github.com/user-attachments/assets/1511bd6d-ca22-4943-9599-b66a05f7277d" alt="필터링 리스트"/>

### 로그인/회원가입
<img src="https://github.com/user-attachments/assets/75469ceb-eb12-46be-bc55-39a018346248" alt="로그인"/>
<img src="https://github.com/user-attachments/assets/23a46c92-f40e-4568-810c-803b179d5274" alt="회원가입"/>

### 글 작성 페이지
<img src="https://github.com/user-attachments/assets/6ab1c1f6-29ed-48e4-8b7c-55c4bcd93d18" alt="글 작성 페이지"/>

### 상세페이지
<img src="https://github.com/user-attachments/assets/80f9e0c4-813c-4666-8823-f268975cd6ef" alt="상세 페이지"/>
- 댓글
<img src="https://github.com/user-attachments/assets/703b15d6-9672-4a4d-bca3-bb1f29bfb073" alt="댓글"/>

### 스크랩(좋아요) 기능
<img src="https://github.com/user-attachments/assets/805b008c-ff86-4d7a-bb9a-e00691b2cd80" alt="리스트의 좋아요 버튼"/>
<img src="https://github.com/user-attachments/assets/db49c180-280c-4a7a-9a7a-a4c38e7d22e5" alt="상세페이지의 좋아요 버튼"/>

### 마이페이지
- 1년 전 이달 게시글, 내 게시글, 좋아요한 게시글
<img src="https://github.com/user-attachments/assets/6c2e69df-80ed-4880-bab8-21e09767d166" alt="마이페이지1"/>
<img src="https://github.com/user-attachments/assets/7516c1e4-2163-4b05-b614-d00780887382" alt="마이페이지2"/>

## 트러블 슈팅
### 1. 좋아요 기능 구현 시 supabase 데이터의 추가와 읽기(CR)만 되고 업데이트나 삭제(UD)는 안 되는 문제 (팀원 김경혜)
-   원인 찾기 :
    1.  ❌ supabase 세팅이 잘못되었기 때문이다
        1.  supabase 세팅이 잘못되어 있던 것은 맞으나 별개의 문제였다.
    2.  ❌ supabase가 배열 형태의 데이터를 관리하지 않기 때문에 배열 형태의 좋아요 데이터를 업데이트 할 수 없는 것이다
        1.  배열 형태인 것과는 상관 없었다.
    3.  ✅ supabase 정책을 설정하지 않았기 때문이다
    <br>
-   해결 및 결과 : 수정/삭제와 관련된 supabase 데이터 테이블 정책을 설정하자 문제가 해결되었다.
    -   ❌ 기존에 생각하기로는 supabase 데이터 테이블 정책이 설정되어 있지 않으면 제한 없이 CRUD를 할 수 있는 것인 줄 알았다.
    -   ✅ 하지만 실제로는 supabase 데이터 테이블 정책이 설정되어 있지 않으면 CRUD를 할 수 없게 되어 있었다.

### 2. React에서 훅을 호출하는 규칙을 위반하여 나타난 현상 (팀원 노용철)

-   문제 발생 : 기능 구현중 **Rendered more hooks than during the previous render** 코드 에러가 발생. 구글링을 해보니 조건부로 훅을 호출하거나, 반복문 안에서 훅을 호출할 떄를 의미했다. **CommentItem** 컴포넌트에서 **useDeleteCommen**t 훅을 사용하는 방법에 문제가 있었음
    
-   원인 찾기 : **useCommentNickname** 훅을 **map 함수 내부에서 호출**했기 때문에 에러가 발생 **React** **Hooks**는 컴포넌트 함수의 **최상위 레벨에서만 호출**되어야 하며 그렇지 않으면 렌더링이 반복될 때 **Hooks** 호출 순서가 변하게 되어 에러가 발생하는 것으로 확인

```typescript
{data.map((comment) => {
  const { data: memberData, isLoading: isMemberLoading } = useCommentNickname(comment.mem_no);
  if (isMemberLoading) return <li key={comment.comment_id}>로딩중...</li>;
  
  return (
    <li key={comment.comment_id} className="border-b py-2">
      <p className="font-semibold">{memberData ? memberData.mem_nickname : "닉네임 없음"}</p>
      <p>{comment.comment_content}</p>
      <span className="text-gray-500">{comment.comment_date}</span>
    </li>
  );
})}
//코드에서 useCommentNickname 훅이 map 함수 내부에서 호출되고 있어서
//렌더링마다 Hooks 호출 순서가 달라지면서 에러가 발생
```

-    문제 해결 : **Hooks**를 반복문 내에서 호출하지 않도록 컴포넌트를 재구성 하였고, **map** 함수 내에서 훅을 호출하는 대신에 별도의 컴포넌트로 분리하여 최상위 레벨에서 **Hooks**를 호출할 수 있도록 수정했음
   -- 1.  컴포넌트 생성: **CommentItem** 컴포넌트로 분리하여 각 댓글을 개별적으로 처리하고 최상위 레벨에서 **useCommentNickname** 훅을 호출하도록 변경
   --  2.  useCommentNickname 위치 수정: map 함수 내부에서 훅이 호출되지 않도록 하여 React Hooks 규칙을 지켜냄
```typescript
const CommentItem = ({ comment }: { comment: CommentTypes }) => {
  const { user } = useUserStore();
  const { data: memberData, isLoading: isMemberLoading } = useCommentNickname(comment.mem_no);
  const findAuth = comment.mem_no === user.userId;
  
  if (isMemberLoading) return <li>로딩중...</li>;

  return (
    <li className="border-b py-2">
      <p className="font-semibold">{memberData ? memberData.mem_nickname : "닉네임 없음"}</p>
      <p>{comment.comment_content}</p>
      <span className="text-gray-500">{comment.comment_date}</span>
      {findAuth && <button className="border-2 p-1">삭제</button>}
    </li>
  );
}
```    

## 팀원 소감
|이름|소감|
|-------|------|
|이정곤|프로젝트 진행하면서 서툰 부분이 있었었는데, 믿고 응원해준 팀원 분들덕분에 좋은 결과, 좋은 프로젝트를 만들수 있었습니다!|
|김경혜|그 동안 좋아요 기능 한 번쯤 구현해보고 싶었는데, 이번에 구현해볼 기회가 있어서 좋았습니다.|
|장종호|시간이 부족함에도 팀원끼리 협력하며 잘 마무리되어서 좋았습니다~!!|
|노용철|다들 각자 맡은 역할을 충분히 소화해주셔서 감사했습니다!!|