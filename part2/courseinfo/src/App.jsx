const Course = ({  course  }) => {
  console.log('course course', course)
    return (
      <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
      </>
    )
}

const Header = ({  course  }) => {
  return (
    <>
      <h1>{course}</h1>
    </>
  );
};

const Part = ({  part  }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Content = ({  parts  }) => {
  return (
    <>
      {parts.map(part => <Part part={part} key={part.id} />)}
    </>
  );
};

const Total = ({  parts  }) => {
  let total = parts.reduce((accumulator, currentValue)=>{
    return accumulator + currentValue.exercises
  }, 0)

  return <strong><p>Number of exercises {total}</p></strong>;
};

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
  <>
  <Header course="Web Development Curriculumn" />
  {courses.map(course => <Course key={course.id} course={course} />)}
  </>
  )
}

export default App;
