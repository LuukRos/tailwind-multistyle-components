import { Button } from "./components/button/button";

function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-100 dark:bg-gray-800">
      {/* Sizes */}
      <section className="flex items-center gap-4">
        <h2>Sizes</h2>
        <div className="flex items-center justify-start gap-4">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </section>
    </main>
  );
}

export default App;
