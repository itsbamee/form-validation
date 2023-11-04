const form = document.querySelector('form');

/*
  form 인증 로직 흐름
  1. form 요소에 submit 이벤트 (전송) 연결
  2. 각 form의 항목마다의 전용 인증함수 정의
  3. 각 인증함수마다 인증여부에 따라 true, false값 return 처리
  4. 전송이벤트 발생 시 각 인증함수에서 하나라도 false 리턴 시 e.preventDefault로 전송기능 막고 error 메세지 출력
  5. 모든 함수가 true 반환 시 전송기능 실행

  
  각 폼 요소별 인증처리 로직 (인증성공 조건)
  1. userId, textarea : 몇글자이상 입력 시
  2. pwd : 두개의 비밀번호 동일, 특수문자, 숫자, 영문 무조건 포함, 5글자 이상
  3. email : @ 포함, @ 앞뒤로 문자값 포함, @ 뒤쪽에서 .포함, . 앞뒤로 문자값 포함
  4. education : value값이 빈 문자열이 아니면 성공
  5. gender : 하나라도 체크가 되어야 성공
  6. checkbox : 하나 혹은 복수개 이상 체크되어야 성공
*/
