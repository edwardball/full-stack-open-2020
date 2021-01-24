import React from "react";

const Header = ({ course }) => {
    return (
      <h2>{course.name}</h2>
    )
  }
  
  const Total = ({ course }) => {
    const courseParts = course.parts;
    const reducerFunction = (accumulator, currentValue) => {
      return accumulator + currentValue.exercises;
    }
    const sum = courseParts.reduce(reducerFunction, 0);
  
    return (
      <p><strong>Number of exercises {sum}</strong></p>
    ) 
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  
  const Content = ({ course }) => {
    return (
      <div>
        {
          course.parts.map((part)=>{
            return <Part key={part.id} part={part}/>
          })
        }
      </div>
    )
  }

  const Course = ({course}) => {

    return (
      <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </div>
    )
  }

  export default Course;