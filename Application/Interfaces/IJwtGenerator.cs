using Domain.Objects;

namespace Application.Interfaces
{
  public interface IJwtGenerator
  {
    string CreateToken(AppUser user);
  }
}
