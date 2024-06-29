import { Themes } from '@/themes';
import dynamic from 'next/dynamic';

const Card = dynamic(() => import('./Card'), {
  ssr: false,
});


export default function Theme() {
  return (
    <section
    data-theme="default"
    id="themes"
    className="dark:bg-dark-background dark:border-dark-border bg-light-background border-light-border flex min-h-screen w-full flex-col items-start justify-start gap-12 border-t-2 border-solid px-6 py-8 lg:px-48"
  >
    <h2 className="text-center text-5xl font-bold">Themes</h2>
    <div
      className="grid w-full gap-12 rounded-xl"
      style={{
        gridTemplateColumns: "repeat(auto-fill, minmax(24rem, 1fr))",
        gridTemplateRows: "min-content",
      }}
    >
      {Object.keys(Themes).map((theme, i) => {
        return (
          <Card key={i} theme={theme} width={300} />
        );
      })}
    </div>
  </section>
  )
}
