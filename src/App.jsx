import React, { useState, useEffect } from 'react';
import { ArrowRight, MoveUpRight, Circle, Database, Shield, Scale, Box, FileText, Download, X, ExternalLink } from 'lucide-react';

// --- DATA ---
const PROJECTS = [
  {
    id: 1,
    category: "PROJECT 01",
    title: "Infra & Scale",
    role: "PM (기획 총괄, 마이그레이션 정책 수립)",
    summary: "170억 건 레거시 데이터 마이그레이션 및 서비스 안정화",
    desc: "페타바이트(PB) 급 데이터를 클라우드로 이관하고, 300만 트래픽을 수용하는 대규모 인프라를 구축했습니다.",
    stats: "사진 170억 장 / 동영상 1.6억 개 (AWS S3 이관)",
    performance: "오픈 직후 양대 마켓 인기 순위 1위, 서버 다운 0회",
    challenge: "10년 넘게 방치된 레거시 DB를 복원하는 과정에서 물리적 시간 한계와 오픈 초기 650만 명 동시 접속에 따른 서버 과부하(Service Unavailable)가 예상되었습니다.",
    solution: [
      { title: "On-Demand Migration", desc: "전체 데이터 일괄 로딩 대신, 로그인한 활성 유저(Active User)의 데이터를 우선 복구하는 '트리거(Trigger) 기반 큐(Queue)' 시스템 설계." },
      { title: "Traffic Control", desc: "대기열 UX(Waiting Room)를 도입하여 트래픽을 분산하고, Cold/Hot Data Tiering 정책으로 클라우드 비용 최적화." }
    ],
    matchPoint: "안랩의 클라우드 보안 관제(MSP) 및 대규모 트래픽 처리 솔루션 기획 시, 인프라 비용 효율성과 가용성(Availability)을 고려한 아키텍처를 설계할 수 있습니다.",
    mediaTitle: "싸이월드, 사진 170억장·동영상 1억 5천만개 복원 완료... AWS 클라우드 이관 성공",
    mediaLink: "https://zdnet.co.kr/view/?no=20210705085812"
  },
  {
    id: 2,
    category: "PROJECT 02",
    title: "Fintech & Settlement",
    role: "결제/정산 기획, 정책 수립",
    summary: "가상 재화(도토리) 이코노미 설계 및 정산 시스템 고도화",
    desc: "전자금융법을 준수하는 가상 재화 모델을 수립하고, 데이터 무결성을 보장하는 정밀 정산 시스템을 완성했습니다.",
    stats: "선물가게 오픈 직후 일 매출 5,000만 원 달성",
    performance: "정산 오차율 0% (Cross-check 로직 적용)",
    challenge: "유료 충전 도토리와 이벤트로 지급된 무상 도토리가 혼재된 상황에서, 환불 및 아이템 구매 시 정확한 차감 순서와 정산 금액을 산정하는 것이 핵심 과제였습니다. 잘못된 로직은 회계상의 오차와 법적 분쟁으로 이어질 수 있었습니다.",
    solution: [
      { title: "Logic Design", desc: "선입선출(FIFO) 및 유상 우선 차감 로직을 시스템화하여, 환불 요청 시 고객과 회사 간의 분쟁 소지를 원천 차단했습니다." },
      { title: "Settlement Admin", desc: "PG사 결제 데이터와 내부 DB를 자동 대사(Reconciliation)하는 백오피스를 구축하여, 수기 정산의 비효율과 리스크를 제거했습니다." },
      { title: "Policy Setup", desc: "전자금융법 및 소비자보호 지침을 반영하여 환불/소멸 시효 약관을 개정하고, 이를 시스템에 투명하게 반영했습니다." }
    ],
    matchPoint: "안랩이 타겟팅하는 금융/핀테크 보안 및 블록체인 사업에서, 자산 흐름의 투명성을 확보하고 정산 리스크를 제로(Zero)화하는 기획 역량을 발휘하겠습니다.",
    mediaTitle: "GS25, 싸이월드와 업무협약... 온·오프라인 메타버스 결제 생태계 확장",
    mediaLink: "https://www.fnnews.com/news/202107140838186725"
  },
  {
    id: 3,
    category: "PROJECT 03",
    title: "Policy & Risk Mgmt",
    role: "정책 기획, 대관 업무 지원",
    summary: "디지털 유산 정책 수립 및 법적 리스크 관리",
    desc: "규제의 사각지대에서 국회 및 법무팀을 리딩하여, 국내 최초의 디지털 유산 서비스 표준을 정립했습니다.",
    stats: "고인 데이터 관련 법적 분쟁 0건",
    performance: "국회 정책 토론회 참여 및 업계 가이드라인 수립 기여",
    challenge: "서비스 재오픈 후, 사망한 가족의 데이터를 요청하는 유가족의 문의가 폭증했으나, 개인정보보호법상 '사자(死者)의 정보' 제공에 대한 명확한 규정이 없어 법적 리스크가 매우 높았습니다.",
    solution: [
      { title: "Compliance Strategy", desc: "법무 검토를 거쳐 '상속인 전원 동의' 및 '전체 공개 게시물 한정'이라는 내부 컴플라이언스 기준 수립." },
      { title: "Process Setup", desc: "민감 서류(가족관계증명서 등)를 안전하게 접수하고 파기하는 보안 프로세스를 구축하여 정보 유출 리스크 차단." }
    ],
    matchPoint: "규제가 명확하지 않은 신규 보안 기술이나 BM 도입 시, 법적 리스크를 최소화하면서도 비즈니스를 가능하게 만드는(Enabler) 정책을 수립하겠습니다.",
    mediaTitle: "싸이월드 사태로 불붙은 '디지털 유산' 논쟁... 국회서 개정안 논의 점화",
    mediaLink: "https://www.hankookilbo.com/News/Read/A202106031427000332"
  },
  {
    id: 4,
    category: "PROJECT 04",
    title: "Identity & Auth",
    role: "회원 기획, 인증 프로세스 설계",
    summary: "3,500만 회원 CI/DI 기반 본인확인 프로세스 최적화",
    desc: "3,200만 레거시 계정을 최신 인증 체계로 전환하여, 최고 수준의 보안성과 유저 편의성을 동시에 달성했습니다.",
    stats: "3,200만 회원 DB 대상 실명 인증 매칭",
    performance: "계정 탈취 및 오매칭 사고 0건",
    challenge: "과거 수집된 개인정보와 현재의 모바일 본인확인 값(CI/DI)이 일치하지 않아 발생한 '로그인 대란'을 해결하고, 타인 계정 접근을 원천 차단해야 했습니다.",
    solution: [
      { title: "Algorithm", desc: "통신사 본인인증(PASS)의 CI(연계정보) 값을 키(Key)로 활용한 매칭 알고리즘을 도입해 정확도 100% 달성." },
      { title: "UX Optimization", desc: "다중 계정 보유자를 위한 계정 통합/분리 UX를 설계하여 유저 편의성과 보안성을 동시에 확보." }
    ],
    matchPoint: "안랩의 모바일 인증 및 간편 인증 솔루션(V3 Mobile 등) 기획 시, 강력한 보안성을 유지하면서도 사용자 이탈(Churn)을 막는 최적의 인증 플로우를 설계할 수 있습니다.",
    mediaTitle: "싸이월드, '로그인 대란' 뚫고 300만 회원 휴면 해제... 실명인증 시스템 안정화",
    mediaLink: "https://www.sedaily.com/NewsView/264L69X6C6"
  },
  {
    id: 5,
    category: "PROJECT 05",
    title: "Product Ops",
    role: "Product Owner, 운영 총괄",
    summary: "VOC 데이터 기반 서비스 피보팅 및 백오피스 최적화",
    desc: "데이터 인사이트를 통해 서비스의 핵심 가치를 재정의하고, 시스템 고도화로 운영 효율을 30% 이상 극대화했습니다.",
    stats: "VOC 키워드 분석 기반 메인 UX 개편 (친구 리스트 → 미니룸)",
    performance: "CS 처리 리드타임 단축 및 외주 인력 운영 최적화",
    challenge: "오픈 초기 '과거 인맥 노출'에 대한 부정적 VOC가 급증하여 이탈 조짐이 보였으며, 비효율적인 상담 툴로 인해 CS 응대가 지연되고 있었습니다.",
    solution: [
      { title: "Fast Pivot", desc: "유저 니즈가 '소통'이 아닌 '나만의 공간'임을 파악, 메인 화면을 '미니룸'으로 즉각 변경하여 앱스토어 1위 유지." },
      { title: "CRM Admin", desc: "상담원이 유저의 결제/로그/제재 이력을 한눈에 보는 '통합 유저 뷰(User 360 View)'를 기획하여 운영 효율 극대화." }
    ],
    matchPoint: "보안 서비스의 복잡한 기능을 개인/SMB 고객에게 쉽게 전달하고, 운영 비용(Cost)을 절감하는 효율적인 백오피스 시스템을 구축하겠습니다.",
    mediaTitle: "돌아온 싸이월드, 출시 5일 만에 구글·애플 양대 마켓 인기 1위 '싹쓸이'",
    mediaLink: "https://www.yna.co.kr/view/AKR20220407056600017"
  }
];

// Custom Hook for Scroll Spy
const useScrollSpy = (ids, offset = 100) => {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;
      
      for (const id of ids) {
        const element = document.getElementById(id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveId(id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [ids, offset]);

  return activeId;
};

const App = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const activeSection = useScrollSpy(['home', 'about', 'career', 'projects', 'contact']);
  const [selectedProject, setSelectedProject] = useState(null);

  // Cursor Follower Logic
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Modal Controls
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedProject]);

  return (
    <div className="bg-neutral-950 text-white min-h-screen font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden cursor-none">
      
      {/* Custom Cursor */}
      <div 
        className="fixed w-8 h-8 bg-orange-500 rounded-full mix-blend-difference pointer-events-none z-[9999] transition-transform duration-100 ease-out hidden md:block"
        style={{ 
          left: mousePosition.x, 
          top: mousePosition.y,
          transform: 'translate(-50%, -50%)'
        }}
      />

      {/* Side Navigation */}
      <nav className="fixed left-0 top-0 w-12 md:w-20 h-screen border-r border-neutral-800 flex flex-col justify-between items-center py-8 z-40 bg-neutral-950">
        <div className="font-black text-xl md:text-2xl tracking-tighter rotate-180" style={{ writingMode: 'vertical-rl' }}>
          JUN WOO SANG ©26
        </div>
        
        <div className="flex flex-col gap-8">
          {['home', 'about', 'career', 'projects', 'contact'].map((item) => (
            <a 
              key={item}
              href={`#${item}`}
              className={`group relative flex items-center justify-center w-full transition-all duration-300 ${
                activeSection === item ? 'text-blue-500' : 'text-neutral-600 hover:text-white'
              }`}
            >
              <div className={`absolute left-full ml-4 bg-white text-black text-xs font-bold px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden md:block z-50`}>
                {item.toUpperCase()}
              </div>
              <Circle 
                size={activeSection === item ? 16 : 10} 
                fill={activeSection === item ? "currentColor" : "none"}
                className="transition-all duration-300"
              />
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-4 text-neutral-500">
           <div className="w-[1px] h-12 bg-neutral-800 mx-auto"></div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="pl-12 md:pl-20 w-full relative">
        
        {/* 1. HERO SECTION */}
        <section id="home" className="min-h-screen flex flex-col justify-between border-b border-neutral-800 relative overflow-hidden">
          
          <div className="p-6 md:p-12 pt-24 border-b border-neutral-800/50">
            <h2 className="text-xl md:text-2xl font-mono text-neutral-400">
              PRODUCT MANAGER PORTFOLIO
            </h2>
          </div>

          <div className="flex flex-col p-6 md:p-12 justify-center flex-1">
            <h1 className="text-[12vw] leading-[0.85] font-black tracking-tighter uppercase text-white">
              PM<br/>
              PORTFOLIO
            </h1>
            <p className="mt-8 text-xl md:text-3xl font-bold max-w-4xl leading-tight">
              규제와 기술의 경계에서,<br/>
              비즈니스의 '확신'을 설계합니다.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-neutral-800 divide-y md:divide-y-0 md:divide-x divide-neutral-800">
             <div className="p-6 md:p-8">
                <span className="block text-xs font-mono text-neutral-500 mb-2">DATA MIGRATION</span>
                <span className="text-4xl md:text-5xl font-black">170억<span className="text-lg align-top">+</span></span>
             </div>
             <div className="p-6 md:p-8">
                <span className="block text-xs font-mono text-neutral-500 mb-2">USER EXPERIENCE</span>
                <span className="text-4xl md:text-5xl font-black">3,500만<span className="text-lg align-top">명</span></span>
             </div>
             <div className="p-6 md:p-8">
                <span className="block text-xs font-mono text-neutral-500 mb-2">LEGAL RISK</span>
                <span className="text-4xl md:text-5xl font-black">ZERO</span>
             </div>
          </div>
        </section>

        {/* 2. ABOUT & COMPETENCY */}
        <section id="about" className="min-h-screen bg-neutral-900 border-b border-neutral-800 flex flex-col">
           <div className="sticky top-0 bg-neutral-900 z-10 p-6 md:p-12 border-b border-neutral-800 flex justify-between items-center">
             <h2 className="text-xl md:text-3xl font-mono text-orange-500">(001) — ABOUT ME</h2>
           </div>

           <div className="p-6 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-16 py-20">
              <div>
                <h3 className="text-3xl md:text-5xl font-black mb-8 leading-tight">
                  <span className="text-neutral-500">규제와 기술의 경계에서,</span><br/>
                  비즈니스의 '확신'을 설계하는<br/>
                  기획자 전우상입니다.
                </h3>
                <div className="space-y-6 text-lg text-neutral-400 leading-relaxed font-light">
                  <p>
                    안녕하세요. 10년 차 서비스 기획자 전우상입니다.
                    저는 법학을 전공하며 익힌 <strong className="text-white">'규제 해석 능력'</strong>과 
                    싸이월드라는 대규모 플랫폼을 운영하며 체득한 <strong className="text-white">'시스템 설계 능력'</strong>을 겸비하고 있습니다.
                  </p>
                  <p>
                    안랩이 지향하는 '보안 서비스 플랫폼'은 기술적 우위를 넘어, 사용자에게 신뢰(Trust)와 편의(Utility)를 동시에 제공해야 합니다. 
                    저는 "이 기능이 법적으로 안전한가?", "대규모 트래픽을 감당할 수 있는가?"를 치열하게 검증하며 실행 가능한 비즈니스 모델을 만들어왔습니다.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                 <div className="border border-neutral-700 p-6 hover:bg-white hover:text-black transition-colors duration-300 group">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-2xl font-bold">Risk Management</h4>
                      <Scale className="w-8 h-8 text-orange-500 group-hover:text-black" />
                    </div>
                    <ul className="list-disc list-inside font-mono text-sm opacity-70 group-hover:opacity-100 space-y-1">
                      <li>법률 리스크 검토 (개인정보보호법, 전자금융법)</li>
                      <li>ISMS-P 인증 대응</li>
                      <li>이용약관 및 정책 수립</li>
                    </ul>
                 </div>

                 <div className="border border-neutral-700 p-6 hover:bg-orange-500 hover:text-black transition-colors duration-300 group">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-2xl font-bold">System Design</h4>
                      <Database className="w-8 h-8 text-white group-hover:text-black" />
                    </div>
                    <ul className="list-disc list-inside font-mono text-sm opacity-70 group-hover:opacity-100 space-y-1">
                      <li>Back-office (Admin) 설계</li>
                      <li>정산/결제 로직 설계</li>
                      <li>PB급 DB 마이그레이션 기획</li>
                    </ul>
                 </div>

                 <div className="border border-neutral-700 p-6 hover:bg-blue-600 hover:text-white transition-colors duration-300 group">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-2xl font-bold">Tools & Data</h4>
                      <Box className="w-8 h-8 text-white" />
                    </div>
                    <p className="font-mono text-sm opacity-70 group-hover:opacity-100">
                      Jira, Confluence, Slack, Figma, SQL(Basic), GA4, VOC Analysis
                    </p>
                 </div>
              </div>
           </div>
        </section>

        {/* 3. WORK EXPERIENCE */}
        <section id="career" className="bg-black border-b border-neutral-800">
           <div className="p-6 md:p-12 border-b border-neutral-800">
             <h2 className="text-xl md:text-3xl font-mono text-white">(002) — EXPERIENCE</h2>
           </div>
           
           <div className="divide-y divide-neutral-800">
              {/* Job 1 */}
              <div className="p-6 md:p-12 hover:bg-neutral-900 transition-colors group">
                 <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="md:w-1/4">
                       <span className="font-mono text-orange-500">2026.01 - Present</span>
                       <h3 className="text-2xl font-bold mt-2">그린재킷 (Green Jacket)</h3>
                       <p className="text-neutral-500 text-sm mt-1">Product Manager</p>
                    </div>
                    <div className="md:w-3/4">
                       <ul className="space-y-2 text-neutral-300">
                          <li>• 골프 핀테크 서비스 기획</li>
                          <li>• 결제/정산 정책 수립 및 서비스 고도화</li>
                       </ul>
                    </div>
                 </div>
              </div>
              
              {/* Job 2 */}
              <div className="p-6 md:p-12 hover:bg-neutral-900 transition-colors group">
                 <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="md:w-1/4">
                       <span className="font-mono text-neutral-500">2024.09 - 2025.04</span>
                       <h3 className="text-2xl font-bold mt-2 text-neutral-300">싸이월드커뮤니케이션즈</h3>
                       <p className="text-neutral-500 text-sm mt-1">마케팅 책임 / 서비스 인계</p>
                    </div>
                    <div className="md:w-3/4">
                       <ul className="space-y-2 text-neutral-400">
                          <li>• 서비스 종료 및 이관 프로세스 관리</li>
                          <li>• 유저 DB 및 자산 이관 관련 정책 수립</li>
                       </ul>
                    </div>
                 </div>
              </div>

              {/* Job 3 */}
              <div className="p-6 md:p-12 hover:bg-neutral-900 transition-colors group">
                 <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="md:w-1/4">
                       <span className="font-mono text-neutral-500">2021.02 - 2024.04</span>
                       <h3 className="text-2xl font-bold mt-2 text-neutral-300">(주)싸이월드제트</h3>
                       <p className="text-neutral-500 text-sm mt-1">서비스 기획 팀장 / 마케팅 책임</p>
                    </div>
                    <div className="md:w-3/4">
                       <ul className="space-y-2 text-neutral-400">
                          <li className="text-white font-bold">• 싸이월드 리부트(Reboot) 프로젝트 기획 총괄 (앱/웹)</li>
                          <li>• 170억 건 데이터 마이그레이션 및 레거시 시스템 복원 리딩</li>
                          <li>• 도토리 결제 시스템 기획 및 전자금융법 대응 약관/정책 수립</li>
                          <li>• 디지털 유산 정책 수립 및 CS/운영 프로세스 구축</li>
                          <li>• 앱스토어/구글플레이 1위 달성 및 MAU 300만 트래픽 관리</li>
                       </ul>
                    </div>
                 </div>
              </div>

              {/* Job 4 */}
              <div className="p-6 md:p-12 hover:bg-neutral-900 transition-colors group">
                 <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="md:w-1/4">
                       <span className="font-mono text-neutral-500">2017.01 - 2020.05</span>
                       <h3 className="text-2xl font-bold mt-2 text-neutral-300">(주)싸이월드</h3>
                       <p className="text-neutral-500 text-sm mt-1">서비스 기획 / 운영</p>
                    </div>
                    <div className="md:w-3/4">
                       <ul className="space-y-2 text-neutral-400">
                          <li>• 싸이월드 3.0 기획</li>
                          <li>• 서비스 운영 정책 수립 및 VOC 분석 기반 기능 개선</li>
                       </ul>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* 4. KEY PROJECTS */}
        <section id="projects" className="min-h-screen bg-neutral-950 border-b border-neutral-800">
          <div className="sticky top-0 bg-neutral-950/90 backdrop-blur-sm z-10 p-6 md:p-12 border-b border-neutral-800">
             <h2 className="text-xl md:text-3xl font-mono text-white">(003) — KEY PROJECTS (Click to View)</h2>
          </div>

          <div className="flex flex-col">
             {PROJECTS.map((project, index) => (
                <div 
                  key={project.id} 
                  onClick={() => setSelectedProject(project)}
                  className="group border-b border-neutral-800 hover:bg-white hover:text-black transition-colors duration-500 cursor-pointer"
                >
                  <div className="p-6 md:p-12 flex flex-col md:flex-row gap-8 items-start">
                     <div className="md:w-1/3 flex flex-col justify-between">
                        <div>
                           <span className={`font-mono text-sm font-bold tracking-widest px-1 ${index % 2 === 0 ? 'text-orange-500 group-hover:bg-black group-hover:text-orange-500' : 'text-blue-500 group-hover:bg-blue-600 group-hover:text-white'}`}>
                              {project.category}
                           </span>
                           <h3 className="text-4xl md:text-5xl font-black mt-4 leading-none uppercase break-words">
                              {project.title.split('&').map((part, i) => (
                                <span key={i} className="block">{part.trim()} {i === 0 && '&'}</span>
                              ))}
                           </h3>
                        </div>
                     </div>
                     <div className="md:w-2/3 space-y-6 flex flex-col h-full justify-between">
                        <div>
                           <p className="text-xl md:text-2xl font-bold leading-tight mb-4">
                              "{project.summary}"
                           </p>
                           <p className="font-mono text-sm opacity-60">
                              {project.role}
                           </p>
                        </div>
                        <div className="flex items-center gap-2 font-bold group-hover:translate-x-4 transition-transform duration-300 text-sm md:text-base">
                           VIEW DETAILS <ArrowRight size={20} />
                        </div>
                     </div>
                  </div>
                </div>
             ))}
          </div>
        </section>

        {/* 5. FOOTER (CONTACT) */}
        <section id="contact" className="min-h-[60vh] bg-blue-700 text-black flex flex-col justify-between">
           <div className="p-6 md:p-12 border-b border-black">
             <h2 className="text-xl md:text-3xl font-mono text-black">(004) — CONTACT</h2>
           </div>

           <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 text-center group">
              <p className="font-mono mb-6 max-w-2xl font-bold">
                 "비즈니스의 성장을 지탱하는 압도적인 안정성."<br/>
                 안랩의 서비스가 가장 빠르고 안전하게 성장할 수 있는 기반을 만들겠습니다.
              </p>
              
              <div className="flex flex-col md:flex-row gap-4 mt-8">
                 <a href="mailto:nagia@naver.com" className="px-8 py-4 bg-black text-white font-bold hover:bg-white hover:text-black transition-all flex items-center gap-2">
                    <Shield size={18} /> nagia@naver.com
                 </a>
                 <button className="px-8 py-4 border-2 border-black font-bold hover:bg-white transition-all flex items-center gap-2">
                    <Download size={18} /> Download Resume
                 </button>
              </div>
              <p className="mt-4 font-mono font-bold">010-4244-2392</p>
           </div>

           <div className="p-6 md:p-12 border-t border-black bg-black text-neutral-500 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex gap-6">
                 {/* Social Links */}
              </div>
              <p className="font-mono text-sm text-center md:text-right">
                 © 2026 JUN WOO SANG.<br/>
                 BUILT FOR TRUST & SCALE.
              </p>
           </div>
        </section>
      </main>

      {/* PROJECT MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md overflow-hidden" onClick={() => setSelectedProject(null)}>
          <div className="bg-neutral-900 w-full max-w-5xl h-full md:h-auto md:max-h-[90vh] overflow-y-auto border border-neutral-700 shadow-2xl relative animate-in fade-in zoom-in duration-300" onClick={(e) => e.stopPropagation()}>
            
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 md:top-8 md:right-8 bg-black text-white p-2 rounded-full hover:bg-orange-500 hover:text-black transition-colors z-50"
            >
              <X size={24} />
            </button>

            <div className="flex flex-col md:flex-row">
               {/* Left Header Panel (Sticky on Desktop) */}
               <div className="bg-black text-white p-8 md:w-1/3 md:sticky md:top-0 h-auto md:h-full border-b md:border-b-0 md:border-r border-neutral-800">
                  <span className="text-orange-500 font-mono text-sm font-bold tracking-widest">{selectedProject.category}</span>
                  <h3 className="text-4xl md:text-5xl font-black mt-4 leading-none uppercase mb-8 text-white">{selectedProject.title}</h3>
                  
                  <div className="space-y-6 font-mono text-sm opacity-80">
                     <div>
                        <strong className="block text-neutral-500 mb-1">ROLE</strong>
                        {selectedProject.role}
                     </div>
                     <div>
                        <strong className="block text-neutral-500 mb-1">KEY STATS</strong>
                        {selectedProject.stats}
                     </div>
                     <div>
                        <strong className="block text-neutral-500 mb-1">PERFORMANCE</strong>
                        {selectedProject.performance}
                     </div>
                  </div>
               </div>

               {/* Right Content Panel */}
               <div className="p-8 md:p-12 md:w-2/3 bg-neutral-900 text-white space-y-12">
                  
                  <div>
                    <h4 className="text-2xl font-bold mb-4 leading-tight text-white">"{selectedProject.desc}"</h4>
                  </div>

                  {/* Challenge & Solution Grid */}
                  <div className="grid grid-cols-1 gap-8">
                     <div className="border-l-2 border-red-500 pl-6">
                        <h5 className="font-mono text-red-500 font-bold mb-2 text-lg">THE CHALLENGE</h5>
                        <p className="text-neutral-300 leading-relaxed">{selectedProject.challenge}</p>
                     </div>
                     
                     <div className="border-l-2 border-blue-500 pl-6">
                        <h5 className="font-mono text-blue-500 font-bold mb-4 text-lg">THE SOLUTION</h5>
                        <div className="space-y-6">
                           {selectedProject.solution.map((sol, idx) => (
                              <div key={idx}>
                                 <strong className="block text-white mb-1 text-lg">{sol.title}</strong>
                                 <p className="text-neutral-300 leading-relaxed">{sol.desc}</p>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>

                  {/* AhnLab Match Point */}
                  <div className="bg-neutral-800 p-6 border border-neutral-700">
                     <div className="flex items-center gap-2 mb-3 text-orange-500 font-bold">
                        <Shield size={20} />
                        <span>AHNLAB MATCH POINT</span>
                     </div>
                     <p className="text-neutral-300 leading-relaxed">
                        {selectedProject.matchPoint}
                     </p>
                  </div>

                  {/* Media Coverage */}
                  <div className="border-t border-neutral-800 pt-8">
                     <h5 className="font-mono text-neutral-500 font-bold mb-4">MEDIA COVERAGE</h5>
                     <a 
                        href={selectedProject.mediaLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group flex items-start justify-between gap-4 p-4 border border-neutral-700 hover:bg-white hover:text-black transition-all"
                     >
                        <div>
                           <span className="text-2xl mr-2">📰</span>
                           <span className="font-bold underline decoration-1 underline-offset-4 group-hover:no-underline">{selectedProject.mediaTitle}</span>
                        </div>
                        <ExternalLink size={20} className="shrink-0" />
                     </a>
                  </div>

               </div>
            </div>

          </div>
        </div>
      )}

      <style>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255,255,255,0.3);
        }
      `}</style>
    </div>
  );
};

export default App;
