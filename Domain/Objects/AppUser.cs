using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain.Objects
{
  public class AppUser : IdentityUser
  {
    public string DisplayName { get; set; }
    public ICollection<UserActivity> UserActivities { get; set; }
  }
}
