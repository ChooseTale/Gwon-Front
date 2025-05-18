import React from "react";

export const metadata = {
  title: "개인정보 처리방침 | ChooseTale",
  description: "ChooseTale의 개인정보 처리방침입니다.",
};

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">개인정보 처리방침</h1>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-3">
            1. 개인정보의 처리 목적
          </h2>
          <p className="mb-2">
            ChooseTale(&apos;https://choosetale.click&apos;)은 다음의 목적을
            위하여 개인정보를 처리하고 있으며, 다음의 목적 이외의 용도로는
            이용하지 않습니다.
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>회원 가입 및 관리, 서비스 제공</li>
            <li>콘텐츠 제공, 맞춤 서비스 제공</li>
            <li>서비스 개선 및 개발</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            2. 개인정보의 처리 및 보유 기간
          </h2>
          <p className="mb-2">
            ChooseTale은 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터
            개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서
            개인정보를 처리·보유합니다.
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>회원 가입 정보: 회원탈퇴 시까지</li>
            <li>서비스 이용 기록: 서비스 종료 후 3개월</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            3. 정보주체와 법정대리인의 권리·의무 및 그 행사방법
          </h2>
          <p className="mb-2">
            정보주체는 ChooseTale에 대해 언제든지 개인정보
            열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            4. 처리하는 개인정보의 항목
          </h2>
          <p className="mb-2">
            ChooseTale은 다음의 개인정보 항목을 처리하고 있습니다.
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>필수항목: 이메일 주소, 비밀번호</li>
            <li>선택항목: 닉네임, 프로필 이미지</li>
            <li>자동 수집 항목: 접속 IP 정보, 쿠키, 서비스 이용 기록</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">5. 개인정보의 파기</h2>
          <p className="mb-2">
            ChooseTale은 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가
            불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">6. 개인정보 보호책임자</h2>
          <p className="mb-2">
            ChooseTale은 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보
            처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와
            같이 개인정보 보호책임자를 지정하고 있습니다.
          </p>
          <div className="pl-6">
            <p>• 개인정보 보호책임자</p>
            <p>성명: [책임자명]</p>
            <p>직책: [직책]</p>
            <p>연락처: [이메일], [전화번호]</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            7. 개인정보 처리방침 변경
          </h2>
          <p className="mb-2">
            이 개인정보처리방침은 2024년 [월] [일]부터 적용됩니다.
          </p>
        </section>

        <section className="mt-10">
          <p className="italic text-gray-600">
            최종 업데이트: 2024년 [월] [일]
          </p>
        </section>
      </div>
    </div>
  );
}
