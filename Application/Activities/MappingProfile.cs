using System.Linq;
using AutoMapper;
using Domain.Objects;
using Domain.Objects.Models;

namespace Application.Activities
{
  public class MappingProfile : Profile
  {
    public MappingProfile()
    {
      MapActivities();
      MapAttendees();
    }

    private void MapActivities()
    {
      CreateMap<Activity, ActivityDto>();
    }

    private void MapAttendees()
    {
      CreateMap<UserActivity, AttendeeDto>()
        .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
        .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
        .ForMember(d => d.Image, o => o.MapFrom(s => s.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url));
    }
  }
}
