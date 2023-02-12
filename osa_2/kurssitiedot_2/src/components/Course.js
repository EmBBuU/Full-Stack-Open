const Header = ({ course }) => <h1>{course}</h1>;

const Part = ({ part, exercises }) => (
  <p>
    {part} {exercises}
  </p>
);

const Content = ({ parts }) => (
  <div>
    {parts.map((part, id) => (
      <Part key={id} part={part.name} exercises={part.exercises} />
    ))}
  </div>
);

const Course = ({ course }) => (
  <div>
    {course.map((course) => (
      <div key={course.id}>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    ))}
  </div>
);

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);
  return <b>Total of {total} exercises</b>;
};

export default Course;
