interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }

  interface CoursePartDescription extends CoursePartBase {
    description: string;
  }
  
  interface CoursePartBasic extends CoursePartDescription {
    kind: "basic"
  }
  
  interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
  }

  interface CoursePartRequirements extends CoursePartDescription {
    requirements: string[]
    kind: 'special'
  }
  
  interface CoursePartBackround extends CoursePartDescription {
    description: string;
    backroundMaterial: string;
    kind: "background"
  }
  
  type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackround | CoursePartRequirements;


  export default CoursePart