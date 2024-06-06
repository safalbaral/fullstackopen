const Course = ({  course  }) => {
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
      <Part part={parts[0]} />
      <Part part={parts[1]} />
      <Part part={parts[2]} />
    </>
  );
};

const Total = ({  parts  }) => {
  let total = 0;
  parts.forEach((part) => {
    total += part.exercises;
  });

  return <strong><p>Number of exercises {total}</p></strong>;
};

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
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
      }
    ]
  }

  return <Course course={course} />
}

export default App;
