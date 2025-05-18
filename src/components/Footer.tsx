import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Footer() {
  return (
    <footer className="w-full fixed bottom-0 bg-background-dark border-t border-muted py-6">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center">
        <div className="flex space-x-4 mb-4">
          <Sheet>
            <SheetTrigger className="text-sm text-gray-400 hover:text-white transition-colors">
              개인정보 처리방침
            </SheetTrigger>
            <SheetContent
              side="bottom"
              className="overflow-y-auto max-h-[80vh]"
            >
              <SheetHeader>
                <SheetTitle className="text-3xl font-bold mb-6">
                  개인정보 처리방침
                </SheetTitle>
              </SheetHeader>
              <div className="space-y-6">
                <section>
                  <h2 className="text-xl font-semibold mb-3">
                    1. 개인정보의 처리 목적
                  </h2>
                  <p className="mb-2">
                    ChooseTale(&apos;https://choosetale.click&apos;)은 다음의
                    목적을 위하여 개인정보를 처리하고 있으며, 다음의 목적 이외의
                    용도로는 이용하지 않습니다.
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
                    ChooseTale은 법령에 따른 개인정보 보유·이용기간 또는
                    정보주체로부터 개인정보를 수집 시에 동의받은 개인정보
                    보유·이용기간 내에서 개인정보를 처리·보유합니다.
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
                    <li>
                      자동 수집 항목: 접속 IP 정보, 쿠키, 서비스 이용 기록
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">
                    5. 개인정보의 파기
                  </h2>
                  <p className="mb-2">
                    ChooseTale은 개인정보 보유기간의 경과, 처리목적 달성 등
                    개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를
                    파기합니다.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">
                    6. 개인정보 보호책임자
                  </h2>
                  <p className="mb-2">
                    ChooseTale은 개인정보 처리에 관한 업무를 총괄해서 책임지고,
                    개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을
                    위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
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
            </SheetContent>
          </Sheet>
          <span className="text-gray-500">|</span>
          <Sheet>
            <SheetTrigger className="text-sm text-gray-400 hover:text-white transition-colors">
              서비스 이용약관
            </SheetTrigger>
            <SheetContent
              side="bottom"
              className="overflow-y-auto max-h-[80vh]"
            >
              <SheetHeader>
                <SheetTitle className="text-3xl font-bold mb-6">
                  서비스 이용약관
                </SheetTitle>
              </SheetHeader>
              <div className="space-y-6">
                <section>
                  <h2 className="text-xl font-semibold mb-3">제1조 (목적)</h2>
                  <p className="mb-2">
                    이 약관은 ChooseTale(&apos;https://choosetale.click&apos;,
                    이하 &apos;서비스&apos;)의 이용조건 및 절차, 회사와 회원
                    간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">
                    제2조 (용어의 정의)
                  </h2>
                  <p className="mb-2">
                    이 약관에서 사용하는 용어의 정의는 다음과 같습니다.
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>
                      &apos;서비스&apos;란 회사가 제공하는 모든 서비스를
                      의미합니다.
                    </li>
                    <li>
                      &apos;회원&apos;이란 서비스에 가입하여 계정을 부여받은
                      자를 의미합니다.
                    </li>
                    <li>
                      &apos;콘텐츠&apos;란 회원이 서비스 내에서 생성, 게시,
                      저장한 모든 형태의 데이터를 의미합니다.
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">
                    제3조 (약관의 효력 및 변경)
                  </h2>
                  <p className="mb-2">
                    이 약관은 서비스 화면에 게시하거나 기타의 방법으로 회원에게
                    공지함으로써 효력이 발생합니다. 회사는 필요한 경우 약관을
                    변경할 수 있으며, 변경된 약관은 공지함으로써 효력이
                    발생합니다.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">
                    제4조 (서비스 제공 및 변경)
                  </h2>
                  <p className="mb-2">
                    회사는 다음과 같은 서비스를 제공합니다.
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>텍스트 기반 게임 제작 및 플레이 서비스</li>
                    <li>AI 기반 스토리텔링 지원 서비스</li>
                    <li>회원 간 소통 및 콘텐츠 공유 서비스</li>
                  </ul>
                  <p className="mt-2">
                    회사는 서비스의 내용, 이용방법, 이용시간을 변경할 수 있으며,
                    이 경우 변경사항을 공지합니다.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">
                    제5조 (회원의 의무)
                  </h2>
                  <p className="mb-2">회원은 다음 행위를 하여서는 안 됩니다.</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>타인의 정보 도용</li>
                    <li>회사가 제공하는 서비스의 운영을 방해하는 행위</li>
                    <li>서비스를 이용하여 법령, 공서양속에 반하는 행위</li>
                    <li>
                      다른 회원이나 제3자를 비방하거나 명예를 훼손하는 행위
                    </li>
                    <li>
                      회사의 지식재산권, 제3자의 지식재산권 등 기타 권리를
                      침해하는 행위
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
                    회사는 회원이 이 약관의 의무를 위반하거나 서비스의 정상적인
                    운영을 방해한 경우, 경고, 일시정지, 영구이용정지 등의 조치를
                    취할 수 있습니다.
                  </p>
                </section>

                <section className="mt-10">
                  <p className="italic text-gray-600">
                    최종 업데이트: 2024년 [월] [일]
                  </p>
                </section>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="text-xs text-gray-500">
          © {new Date().getFullYear()} ChooseTale. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
