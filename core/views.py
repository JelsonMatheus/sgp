from django.shortcuts import render
from django.views import generic
from django.views.generic.edit import CreateView
from django.contrib.auth.views import LoginView, LogoutView
from django.contrib.auth.mixins import LoginRequiredMixin

from core.forms import SocialPostForm
from core.models import SocialPost


class CoreLoginView(LoginView):
    template_name = 'core/auto/login.html'
    redirect_authenticated_user = True
    next_page = 'core:index'


class CoreLogoutView(LogoutView):
    next_page = 'core:index'


class IndexView(LoginRequiredMixin, generic.TemplateView):
    template_name = "core/index.html"
    login_url = "account/login/"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['module'] = "LISTAGEM"
        context['social_posts'] = SocialPost.objects.all()
        return context


class CretePostView(LoginRequiredMixin, CreateView):
    template_name = "core/post-create.html"
    login_url = "account/login/"
    form_class = SocialPostForm
    success_url = '/'
    

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['module'] = "ADICIONAR"
        return context
    
    def form_invalid(self, form):
        print(form.errors)
        return self.render_to_response(self.get_context_data(form=form))