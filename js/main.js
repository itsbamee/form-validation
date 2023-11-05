const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
	//전송처리 안되게 먼저 처리
	if (!isText('userid', 5)) e.preventDefault();
	if (!isText('comments', 10)) e.preventDefault();
	if (!isPwd('pwd1', 'pwd2', 5)) e.preventDefault();
	if (!isSelect('edu')) e.preventDefault();
	if (!isEmail('email')) e.preventDefault();
	if (!isCheck('gender')) e.preventDefault();
	if (!isCheck('hobby')) e.preventDefault();
});

//텍스트값 입력 input 인증로직 함수
function isText(name, len) {
	const input = form.querySelector(`[name=${name}]`);
	const text = input.value.trim();
	if (text.length < len) {
		// alert(`입력한 글자 갯수가 ${len}글자 이상이어야 합니다.`);
		showErr(name);
		return false;
	} else {
		return true;
	}
}

//비밀번호 입력 인증로직 함수
function isPwd(name1, name2, len) {
	//정규표현식으로 0부터 9까지의 값을 조건으로 지정해놓음
	const num = /[0-9]/;
	const eng = /[a-zA-Z]/; //모든 소문자 a부터 z까지, 모든 대문자 A부터 Z까지
	const spc = /[!@#$%^&*()]/;
	const pwd1 = form.querySelector(`[name=${name1}]`).value;
	const pwd2 = form.querySelector(`[name=${name2}]`).value;

	//만약 비밀번호의 글자값이 len보다 적거나 혹은 비밀번호에 숫자가없거나
	if (pwd1.length < len || !num.test(pwd1) || !eng.test(pwd1) || !spc.test(pwd1) || pwd1 !== pwd2) {
		// alert(
		// 	`비밀번호는 ${len}글자이상, 특수문자, 숫자, 문자를 모두 포함해야 하고 두개의 비밀번호가 같아야 합니다.`
		// );
		showErr(name1);
		showErr(name2);
		return false;
	} else {
		return true;
	}
}

//셀렉트 인증로직 함수
function isSelect(name) {
	const input = form.querySelector(`[name=${name}]`).value;
	if (!input) {
		// alert(`학력을 선택해주세요.`);
		showErr(name);
		return false;
	} else {
		return true;
	}
}

//email 인증로직함수
function isEmail(name) {
	const input = form.querySelector(`[name=${name}]`).value;

	if (!/@/.test(input)) {
		// alert('@가 포함되어야 합니다.');
		showErr(name);
		return false;
	} else {
		if (!input.split('@')[0] || !input.split('@')[1]) {
			// alert('@ 앞뒤로 문자값이 있어야 합니다.');
			showErr(name);
			return false;
		} else {
			if (!/\./.test(!input.split('@')[1])) {
				// alert('이메일주소에 .이 있어야 됩니다.');
				showErr(name);
				return true;
			} else {
				if (!input.split('.')[0] || !input.split('.')[1]) {
					// alert('앞뒤로 문자값이 있어야 됩니다.');
					showErr(name);
					return false;
				} else {
					return true;
				}
			}
		}
	}
}

//check 인증로직
function isCheck(name) {
	const inputs = form.querySelectorAll(`[name=${name}]`);
	let isChecked = false;
	//input은 배열. 계속돌면서 덮어쓰기. 하나라도 true있으면 false -> true로 변경
	inputs.forEach((input) => input.checked && (isChecked = true));
	if (!isChecked) {
		// alert('해당 선택사항을 하나 이상 체크하세요.');
		showErr(name);
		return false;
	} else {
		return true;
	}
}

//에러구문 출력함수
function showErr(name) {
	const el = form.querySelector(`[name=${name}]`);
	const parentEl = el.closest('td');
	let errs = '';
	el.getAttribute('placeholder')
		? (errs = el.getAttribute('placeholder'))
		: (errs = '하나이상 선택하세요.');
	const errEl = document.createElement('p');
	errEl.innerText = errs;
	parentEl.append(errEl);
}

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
