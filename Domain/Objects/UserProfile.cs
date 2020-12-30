using System.Collections.Generic;

namespace Domain.Objects
{
  public class UserProfile
  {
    public string DisplayName { get; set; }
    public string Username { get; set; }
    public string Image { get; set; }
    public string Bio { get; set; }
    public ICollection<Photo> Photos { get; set; }
  }
}
