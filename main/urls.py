from django.urls import path,re_path
from . import views
from django.conf import settings
from django.conf.urls.static import static
urlpatterns = [
    path('login', views.handle_registration, name='handle_registration'),
    path('verify_otp', views.verify_otp, name='verify_otp'),
    path('dashboard/event_registration',views.event_registration,name='event_registration'),
    path('elara',views.elara,name='elara'),
    path('elara_info',views.elara_info,name='elara_info'),
    path('dashboard/my_registered_events',views.my_registered_events,name='my_regsitered_events'),
    path('remember_me',views.remember_me,name='remember_me'),
    path('forgot_password',views.forgot_password,name='forgot_password')
    
    #path('', views.notes, name='notes'),
    #path('notes', views.get_notes, name='get_notes'),
    #path('add_note', views.add_note, name='add_note'),
    #path('delete_record', views.delete_record, name='delete_record'),
    #path('update_record', views.update_record, name='update_record'),
    #path('upload', views.upload_page, name='upload_page'),
    #path('profile/upload', views.upload_profile, name='upload_profile'),
    #path('email_page', views.email_page, name='email_page'),
    #path('email_page/send_email', views.send_email, name='send_email'),
    #path('email_page/verify_otp', views.verify_otp, name='verify_otp')
    #path('login_admin', views.login_admin, name='login_admin'),
    #path('login_admin/login', views.login, name='login'),
    #path('login_admin/signup', views.signup, name='signup'),
    #path('dashboard_admin', views.dashboard_admin, name='dashboard_admin'),
    #path('dashboard_admin/personal_data', views.personal_data, name='personal_data'),
    #path('dashboard_admin/update_personal_data', views.update_personal_data, name='update_personal_data'),
    #path('dashboard_admin/add_subuser', views.add_subuser, name='add_subuser'),
    #path('dashboard_admin/subusers_data', views.subusers_data, name='subusers_data'),
    #path('dashboard_admin/update_subuser', views.update_subuser, name='update_subuser'),
    #path('dashboard_admin/delete_subuser', views.delete_subuser, name='delete_subuser'),
    #path('login_admin/forgot_password', views.forgot_password, name='forgot_password'),
    #path('creator_studio_login', views.creator_studio_login, name='creator_studio_login'),
    #path('creator_studio_login/register', views.register, name='register'),
    #path('view_admin', views.view_admin, name='view_admin'),
    #path('add_admin', views.add_admin, name='add_admin'),
    #path('add_admin/add_user', views.add_user, name='add_user'),
    #path('view_admin/all_users', views.all_users, name='all_users'),
    #path('view_admin/delete_user', views.delete_user, name='delete_user'),
    #path('edit_admin', views.edit_admin, name='edit_admin'),
    






]
urlpatterns += static(
    settings.STATIC_URL,
    document_root=settings.STATIC_ROOT
)

# ✅ REACT CATCH-ALL ABSOLUTELY LAST
urlpatterns += [
    re_path(r'^.*$', views.index),
]
