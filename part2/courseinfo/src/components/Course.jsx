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

export default Course;