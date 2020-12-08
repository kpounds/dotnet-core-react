using AutoMapper;
using Domain.Objects;
using Domain.Objects.Models;

namespace Persistence.Mappings
{
  public class MappingProfile : Profile
  {
    public MappingProfile()
    {
      CreateMap<Activity, ActivityDto>();
      CreateMap<UserActivity, AttendeeDto>();
    }
  }
}
