import React from "react";

export const metadata = {
  title: "서비스 이용약관 | ChooseTale",
  description: "ChooseTale의 서비스 이용약관입니다.",
};

export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">서비스 이용약관</h1>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-3">제1조 (목적)</h2>
          <p className="mb-2">
            이 약관은 ChooseTale(&apos;https://choosetale.click&apos;, 이하
            &apos;서비스&apos;)의 이용조건 및 절차, 회사와 회원 간의 권리, 의무
            및 책임사항을 규정함을 목적으로 합니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">제2조 (용어의 정의)</h2>
          <p className="mb-2">
            이 약관에서 사용하는 용어의 정의는 다음과 같습니다.
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              &apos;서비스&apos;란 회사가 제공하는 모든 서비스를 의미합니다.
            </li>
            <li>
              &apos;회원&apos;이란 서비스에 가입하여 계정을 부여받은 자를
              의미합니다.
            </li>
            <li>
              &apos;콘텐츠&apos;란 회원이 서비스 내에서 생성, 게시, 저장한 모든
              형태의 데이터를 의미합니다.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            제3조 (약관의 효력 및 변경)
          </h2>
          <p className="mb-2">
            이 약관은 서비스 화면에 게시하거나 기타의 방법으로 회원에게
            공지함으로써 효력이 발생합니다. 회사는 필요한 경우 약관을 변경할 수
            있으며, 변경된 약관은 공지함으로써 효력이 발생합니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            제4조 (서비스 제공 및 변경)
          </h2>
          <p className="mb-2">회사는 다음과 같은 서비스를 제공합니다.</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>텍스트 기반 게임 제작 및 플레이 서비스</li>
            <li>AI 기반 스토리텔링 지원 서비스</li>
            <li>회원 간 소통 및 콘텐츠 공유 서비스</li>
          </ul>
          <p className="mt-2">
            회사는 서비스의 내용, 이용방법, 이용시간을 변경할 수 있으며, 이 경우
            변경사항을 공지합니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">제5조 (회원의 의무)</h2>
          <p className="mb-2">회원은 다음 행위를 하여서는 안 됩니다.</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>타인의 정보 도용</li>
            <li>회사가 제공하는 서비스의 운영을 방해하는 행위</li>
            <li>서비스를 이용하여 법령, 공서양속에 반하는 행위</li>
            <li>다른 회원이나 제3자를 비방하거나 명예를 훼손하는 행위</li>
            <li>
              회사의 지식재산권, 제3자의 지식재산권 등 기타 권리를 침해하는 행위
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            제6조 (콘텐츠의 저작권)
          </h2>
          <p className="mb-2">
            회원이 서비스 내에서 생성한 콘텐츠의 저작권은 해당 회원에게
            귀속됩니다. 단, 회원은 자신이 생성한 콘텐츠를 서비스 내에서
            이용자들이 이용할 수 있도록 허락한 것으로 간주합니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            제7조 (서비스 이용제한)
          </h2>
          <p className="mb-2">
            회사는 회원이 이 약관의 의무를 위반하거나 서비스의 정상적인 운영을
            방해한 경우, 경고, 일시정지, 영구이용정지 등의 조치를 취할 수
            있습니다.
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
