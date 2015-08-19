from django.test import TestCase

# Create your tests here.

class TestMatchMaker(TestCase):

    def player_accepts(self):
        """
        When player answers yes
        Expect to accpet the proposal and return acceptance list
        """
        return

    def player_denies(self):
        """
        When player doesn't answer or denies
        Expect player removal
        """
        return

    def join_first(self):
        """
        When player requests a new match maker game

        Expect constant selected loading time
        """
        return

    def join_slow(self):
        """
        When player requests a new match maker game but few people asked it

        expect long loading time
        """
        return

    def join_fast(self):
        """
        When player requests a new match maker game

        expect short loading time
        """
        return

    def complete_the_pool(self):
        """
        Add enough players

        expect a timestamp to display accept match popup
        :return:
        """
        return

    def show_accepted(self):
        """
        expect to show a list of login+acceptation status
        :return:
        """
        return

    def all_accpeted(self):
        """
        Expect to remove all players from pool since they're in game
        :return:
        """
        return

    def one_refused(self):
        """
        Expect to remove refused from pool and get the join rate again (as when
        you just join the match maker)
        :return:
        """
        return
