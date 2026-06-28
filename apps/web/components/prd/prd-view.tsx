type PRDViewProps = {
  prd: {
    problemStatement:string;
    goals:string[];
    nonGoals:string[];
    userStories:string[];
    acceptanceCriteria:string[];
    edgeCases:string[];
    successMetrics:string[];
    status:string;
    version:number;
  }
};


export function PRDView({
  prd,
}:PRDViewProps){


return (
<div className="space-y-8">


<div>
<h1 className="text-2xl font-bold">
PRD v{prd.version}
</h1>

<p>
Status: {prd.status}
</p>

</div>



<section>
<h2>
Problem Statement
</h2>

<p>
{prd.problemStatement}
</p>

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
)

}



function Section({
title,
items
}:{
title:string;
items:string[];
}){


return (
<div>

<h2 className="font-semibold text-lg">
{title}
</h2>


<ul>
{
items.map(item=>(
<li key={item}>
{item}
</li>
))
}
</ul>


</div>
)

}