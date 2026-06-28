import { PRDActions } from "./prd-actions";

type PRDViewProps = {
  prd: {
    id: string;
    problemStatement: string;
    goals: string[];
    nonGoals: string[];
    userStories: string[];
    acceptanceCriteria: string[];
    edgeCases: string[];
    successMetrics: string[];
    status: string;
    version: number;
  };
};

export function PRDView({
  prd,
}: PRDViewProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            PRD v{prd.version}
          </h1>

          <p>Status: {prd.status}</p>
        </div>

        <PRDActions
          prdId={prd.id}
          status={prd.status}
        />
      </div>

      <section>
        <h2 className="text-lg font-semibold">
          Problem Statement
        </h2>

        <p>{prd.problemStatement}</p>
      </section>

      <Section
        title="Goals"
        items={prd.goals}
      />

      <Section
        title="Non Goals"
        items={prd.nonGoals}
      />

      <Section
        title="User Stories"
        items={prd.userStories}
      />

      <Section
        title="Acceptance Criteria"
        items={prd.acceptanceCriteria}
      />

      <Section
        title="Edge Cases"
        items={prd.edgeCases}
      />

      <Section
        title="Success Metrics"
        items={prd.successMetrics}
      />
    </div>
  );
}

function Section({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div>
      <h2 className="text-lg font-semibold">
        {title}
      </h2>

      <ul className="list-disc pl-6 space-y-2">
        {items.map((item) => (
          <li key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}