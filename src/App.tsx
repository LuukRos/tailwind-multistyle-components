import { Button } from "./components/button/button";

function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-100 dark:bg-gray-800">
      {/* Shapes */}
      <section className="flex flex-col items-center gap-4">
        <h2 className="text-lg font-bold dark:text-white">Shapes</h2>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button>Rounded</Button>
          <Button shape="pill">Pill button</Button>
          <Button shape="square">Square button</Button>
        </div>
      </section>

      {/* Sizes */}
      <section className="flex flex-col items-center gap-4">
        <h2 className="text-lg font-bold dark:text-white">Sizes</h2>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </section>

      {/* Tones */}
      <section className="flex flex-col items-center gap-4">
        <h2 className="text-lg font-bold dark:text-white">Tones & impact</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="flex flex-col gap-4">
            <Button>Default</Button>
            <Button impact="light">Default</Button>
            <Button impact="bordered">Default</Button>
          </div>
          <div className="flex flex-col gap-4">
            <Button tone="success">Success</Button>
            <Button tone="success" impact="light">
              Success
            </Button>
            <Button tone="success" impact="bordered">
              Success
            </Button>
          </div>
          <div className="flex flex-col gap-4">
            <Button tone="warning">Warning</Button>
            <Button tone="warning" impact="light">
              Warning
            </Button>
            <Button tone="warning" impact="bordered">
              Success
            </Button>
          </div>
          <div className="flex flex-col gap-4">
            <Button tone="danger">Danger</Button>
            <Button tone="danger" impact="light">
              Danger
            </Button>
            <Button tone="danger" impact="bordered">
              Success
            </Button>
          </div>
        </div>
      </section>

      {/* States */}
      <section className="flex flex-col items-center gap-4">
        <h2 className="text-lg font-bold dark:text-white">States</h2>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button disabled>Disabled</Button>
          <Button isLoading>Loading</Button>
        </div>
      </section>
    </main>
  );
}

export default App;
