class Appointment
{
  function Appointment(name, location, time, purpose)
  {
    this.name = name;
    this.location = location;
    this.time = time;
    this.purpose = purpose;
  }
  function getName()
  {
    return this.name;
  }
  function getLocation()
  {
    return this.location;
  }
  function getTime()
  {
    return this.time;
  }
  function getPurpose()
  {
    return this.purpose;
  }
}
